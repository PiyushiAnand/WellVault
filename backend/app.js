const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const port = 4000;
const mime = require("mime-types");

// PostgreSQL connection
// NOTE: use YOUR postgres username and password here
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "project",
  password: "postgres",
  port: 5432,
});



// Configure storage - here we store the file as a Buffer in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' })); // or whatever limit you need
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// CORS: Give permission to localhost:3000 (ie our React app)
// to use this backend API
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Session information
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);


const isValidDate = (dateString) => {
    const dob = new Date(dateString);
    const today = new Date();
  
    if (isNaN(dob.getTime())) return false; // Invalid date format
    if (dob >= today) return false; // Future dates not allowed
  
    return true;
  };

/////////////////////////////////////////////////////////////
// Authentication APIs
// Signup, Login, IsLoggedIn and Logout

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.username) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

app.post("/signup", async (req, res) => {
    const { username, password, name, dob, mobile_number, gender, address, emergency_contact } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    if (!/^\d{10}$/.test(mobile_number)) {
        return res.status(400).json({ message: "Mobile number must be exactly 10 digits" });
      }
      if (!/^\d{10}$/.test(emergency_contact)) {
        return res.status(400).json({ message: "Emergency number must be exactly 10 digits" });
      }
    if(mobile_number === emergency_contact) {
        return res.status(400).json({ message: "Mobile number and emergency contact cannot be the same" });
    }
    if(!isValidDate(dob)) {
        return res.status(400).json({ message: "Invalid date of birth" });
    }
  
    try {
      await pool.query(
        "INSERT INTO Users (username, password_hash, name, dob, mobile_number, gender, address, emergency_contact) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
        [username, password_hash, name, dob, mobile_number, gender, address, emergency_contact]
      );
  
      req.session.username = username;
      res.status(201).json({ message: "User Registered Successfully" });
    } catch (err) {
      console.error("Signup error:", err);
  
      // Check for specific constraint violations
      if (err.code === "23505") {
        // Unique violation (either username or mobile_number is already taken)
        if (err.constraint === "users_pkey") {
          return res.status(400).json({ message: "Error: Username is already registered." });
        } else if (err.constraint === "users_mobile_number_key") {
          return res.status(400).json({ message: "Error: Mobile number is already registered." });
        }
      } else if (err.code === "23502") {
        // Not-null violation
        return res.status(400).json({ message: "Error: All fields are required." });
      } else if (err.code === "22P02") {
        // Invalid input format (e.g., incorrect ENUM value for gender)
        return res.status(400).json({ message: "Error: Invalid input format." });
      }
  
      res.status(500).json({ message: "Error signing up" });
    }
  });
  

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM Users WHERE username = $1;", [
      username,
    ]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      req.session.username = user.username;
      res.status(200).json({ message: "Login successful" });
    } else {
        console.log("Invalid credentials");
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
});

app.get("/isLoggedIn", async (req, res) => {
  if (req.session.username) {
    res
      .status(200)
      .json({ message: "Logged in", username: req.session.username });
  } else {
    return res.status(401).json({ message: "Not logged in" });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Failed to log out" });
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  

app.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const user_name = req.session.username;

    const user_query = `SELECT * FROM Users WHERE username = $1;`;
    const user_res = await pool.query(user_query, [user_name]);

    if (user_res.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = user_res.rows[0];

    const record_query = `SELECT * FROM UserHealthData WHERE username = $1;`;
    const record_res = await pool.query(record_query, [user_name]);

    const records = record_res.rows.length > 0 ? record_res.rows[0] : null;

    res.status(200).json({user:user,record:records});
    // res.render("profile", { user, records }); 
  } 
  catch (error) {
    console.error('Error getting user details', error);
    res.status(500).send('Error while getting user details');
  }
});


app.post("/profile/edit", isAuthenticated, async (req, res) => {
  try {
    const user_name = req.session.username;
    const { name, dob, mobile_number, gender, address, emergency_contact, height, weight,blood_group,allergy,ongoing_treatment } = req.body;

    await pool.query("UPDATE Users SET name = $1, dob = $2, mobile_number = $3, gender = $4, address = $5, emergency_contact = $6 WHERE username = $7", [name, dob, mobile_number, gender,address,emergency_contact,user_name]);

    const record_res = await pool.query("SELECT * FROM UserHealthData WHERE username = $1", [user_name]);

    if (record_res.rows.length > 0) {
      await pool.query(
        "UPDATE UserHealthData SET height = $1, weight = $2, blood_group = $3, allergy = $4, ongoing_treatment = $5 WHERE username = $6",
        [height, weight, blood_group, allergy, ongoing_treatment ,user_name]
      );
    } else {
      // Insert new health record
      await pool.query(
        "INSERT INTO UserHealthData (username, height, weight,blood_group,allergy,ongoing_treatment ) VALUES ($1, $2, $3,$4,$5,$6)",
        [user_name, height, weight,blood_group,allergy,ongoing_treatment ]
      );
    }
    res.status(200).json({ message: "Profile updated successfully" });

  } catch (error) {
    console.error('Error updating profile', error);
    res.status(500).send("Error while updating record");
  }
});


app.get("/medical-history", isAuthenticated, async (req, res) => {
  try {
    const user_name = req.session.username;

    const query = `SELECT date,hospital_name,diagnosis FROM MedicalHistory WHERE username = $1;`;
    const result = await pool.query(query, [user_name]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No medical history found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting medical history", error);
    res.status(500).send("Error while getting medical history");
  }
});

app.get("/vaccines", isAuthenticated, async (req, res) => {
  try {
    const user_name = req.session.username;

    const query = `SELECT vaccine_name, no_of_dose,year_administered,administering_hospital FROM Vaccines WHERE username = $1;`;
    const result = await pool.query(query, [user_name]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No vaccines found" });
    }
    res.status(200).json({vaccines: result.rows});
    
  }
  catch (error) {
    console.error("Error getting vaccines", error);
    res.status(500).send("Error while getting vaccines");
  }
});

app.post("/add-vaccine", isAuthenticated, async (req, res) => {
  try {
    const user_name = req.session.username;
    const { vaccine_name, no_of_dose, year_administered, administering_hospital } = req.body;
    console.log(req.body);
    
    const currentYear = new Date().getFullYear();
    const year = Number(year_administered);

    if (isNaN(year) || year < 1900 || year > currentYear) {
      return res.status(400).json({ message: "Invalid year entered." });
    }
    
    const query = `INSERT INTO Vaccines (username, vaccine_name, no_of_dose, year_administered, administering_hospital) VALUES ($1, $2, $3, $4, $5) returning *;`;
    const result = await pool.query(query, [user_name, vaccine_name, no_of_dose, year_administered, administering_hospital]);
    console.log(result.rows)
    res.status(201).json({vaccine:result.rows[0]});
  } catch (error) {
    console.error("Error adding vaccine", error);
    res.status(500).send("Error while adding vaccine");
  }
}
);

app.post("/delete-vaccine", isAuthenticated, async (req, res) => {
  try {
    const user_name = req.session.username;
    const { vaccine } = req.body;
    const vaccine_name = vaccine.vaccine_name;
    console.log(vaccine)
    const query = `DELETE FROM Vaccines WHERE username = $1 AND vaccine_name = $2;`;

    await pool.query(query, [user_name, vaccine_name]);
    res.status(200).json({ message: "Vaccine deleted successfully" });
  } catch (error) {
    console.error("Error deleting vaccine");
    res.status(500).send("Error while deleting vaccine");
  }
}
);

app.put("/update-vaccine", isAuthenticated, async (req, res) => {
  try {
    const user_name = req.session.username;
    
    const { oname, newVaccine } = req.body;
    // console.log(req.body.newVaccine.vaccine_name);
    console.log(req.body);
    console.log(user_name)
    console.log(oname)
    const currentYear = new Date().getFullYear();
    const year = Number(newVaccine.year_administered);

    if (isNaN(year) || year < 1900 || year > currentYear) {
      return res.status(400).json({ message: "Invalid year entered." });
    }

    const res1 = await pool.query(`Select * from vaccines where username = $1 and vaccine_name = $2`,[user_name,oname]);
    console.log(res1.rows);
    const query = `UPDATE Vaccines SET vaccine_name = $1, no_of_dose = $2, year_administered = $3, administering_hospital = $4 WHERE username = $5 AND vaccine_name = $6;`;
    
    const result = await pool.query(query, [newVaccine.vaccine_name, newVaccine.no_of_dose, newVaccine.year_administered, newVaccine.administering_hospital, user_name,oname]);
    console.log(result.rows)
    res.status(200).json({ message: "Vaccine updated successfully" });
  } catch (error) {
    console.error("Error updating vaccine", error);
    res.status(500).send("Error while updating vaccine");
  }
}
);


app.get("/ongoing-medication", isAuthenticated, async (req, res) => {
  try {
    const user_name = req.session.username;

    const query = `SELECT medication_name,dosage,start_date,end_date,prescribing_doc FROM OngoingMedication WHERE username = $1;`;
    const result = await pool.query(query, [user_name]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No ongoing treatment found" });
    }

    res.status(200).json({meds: result.rows});
  } catch (error) {
    console.error("Error getting ongoing treatment", error);
    res.status(500).send("Error while getting ongoing treatment");
  }
}
);




app.post("/add-medication", isAuthenticated, async (req, res) => {
  try {
    const user_name = req.session.username;
    const { medication_name, dosage, start_date, end_date, prescribing_doc } = req.body;

    const query = `INSERT INTO OngoingMedication (username, medication_name, dosage, start_date, end_date, prescribing_doc) VALUES ($1, $2, $3, $4, $5, $6) returning *;`;
    const result = await pool.query(query, [user_name, medication_name, dosage, start_date, end_date, prescribing_doc]);
    res.status(201).json({med:result.rows[0]});
  } catch (error) {
    console.error("Error adding ongoing treatment", error);
    res.status(500).send("Error while adding ongoing treatment");
  }
}
);
app.post("/delete-medication", isAuthenticated, async (req, res) => {
  try {
    const user_name = req.session.username;
    const { medication } = req.body;
    const medication_name = medication.medication_name;

    const query = `DELETE FROM OngoingMedication WHERE username = $1 AND medication_name = $2;`;

    await pool.query(query, [user_name, medication_name]);
    res.status(200).json({ message: "Ongoing treatment deleted successfully" });
  } catch (error) {
    console.error("Error deleting ongoing treatment");
    res.status(500).send("Error while deleting ongoing treatment");
  }
}
);
app.put("/update-medication", isAuthenticated, async (req, res) => {
  try {
    const user_name = req.session.username;
    
    const { oname, newMedication } = req.body;
    console.log(req.body);
    console.log(user_name)
    console.log(oname)

    const query = `UPDATE OngoingMedication SET medication_name = $1, dosage = $2, start_date = $3, end_date = $4, prescribing_doc = $5 WHERE username = $6 AND medication_name = $7;`;
    
    const result = await pool.query(query, [newMedication.medication_name, newMedication.dosage, newMedication.start_date, newMedication.end_date, newMedication.prescribing_doc, user_name,oname]);
    console.log(result.rows)
    res.status(200).json({ message: "Ongoing treatment updated successfully" });
  } catch (error) {
    console.error("Error updating ongoing treatment", error);
    res.status(500).send("Error while updating ongoing treatment");
  }
}
);


app.get("/lab-reports", isAuthenticated, async (req, res) => {
  try{
    const user_name = req.session.username;
    const query = `SELECT report_id ,data, report_file FROM LabReports WHERE username = $1;`;
    const result = await pool.query(query, [user_name]);

    const processedData = result.rows.map(row => {
      const mimeType = mime.lookup("dummy.pdf"); // replace with real filename if available
      return {
        ...row,
        report_file: row.report_file
          ? `data:${mimeType || "application/octet-stream"};base64,${row.report_file.toString("base64")}`
          : null,
      };
    });
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No lab reports found" });
    }
    return res.status(200).json({ data: processedData });

    
  }
  catch (error) {
    console.error("Error getting lab reports", error);
    res.status(500).send("Error while getting lab reports");
  }
});


app.post("/add-lab-report", isAuthenticated, upload.single("report_file"), async (req, res) => {
  try {
    const user_name = req.session.username;
    const { data } = req.body;
    const fileBuffer = req.file ? req.file.buffer : null;

    const query = `INSERT INTO LabReports (username, data, report_file) VALUES ($1, $2, $3) returning *;`;
    const result = await pool.query(query, [user_name, data, fileBuffer]);
    res.status(201).json({ report: result.rows[0] });
  } catch (error) {
    console.error("Error adding lab report", error);
    res.status(500).send("Error while adding lab report");
  }
});

app.put("/update-lab-report", isAuthenticated, upload.single("report_file"), async (req, res) => {
  try {
    const user_name = req.session.username;
    const { report_id, data } = req.body;
    const fileBuffer = req.file ? req.file.buffer : null;

    const query = `UPDATE LabReports SET data = $1, report_file = $2 WHERE username = $3 AND report_id = $4;`;
    await pool.query(query, [data, fileBuffer, user_name, report_id]);

    res.status(200).json({ message: "Lab report updated successfully" });
  } catch (error) {
    console.error("Error updating lab report", error);
    res.status(500).send("Error while updating lab report");
  }
});

app.post("/delete-lab-report", isAuthenticated, async (req, res) => {
  try {
    const user_name = req.session.username;
    const { report } = req.body;
    const report_id = report.report_id;

    const query = `DELETE FROM LabReports WHERE username = $1 AND report_id = $2;`;

    await pool.query(query, [user_name, report_id]);
    res.status(200).json({ message: "Lab report deleted successfully" });
  } catch (error) {
    console.error("Error deleting lab report");
    res.status(500).send("Error while deleting lab report");
  }
}
);