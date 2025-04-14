const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const port = 4000;

// PostgreSQL connection
// NOTE: use YOUR postgres username and password here
const pool = new Pool({
  user: "whoknows",
  host: "localhost",
  database: "project",
  password: "whoknows",
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

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



