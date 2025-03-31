-- ENUM types must be created first in PostgreSQL
CREATE TYPE gender_enum AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE blood_group_enum AS ENUM ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-');
CREATE TYPE hospital_type_enum AS ENUM ('Public', 'Private');

-- USER DATA
CREATE TABLE Users (
    username VARCHAR(50) PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    DOB DATE NOT NULL,
    mobile_number VARCHAR(15) NOT NULL UNIQUE,
    gender gender_enum NOT NULL,
    address TEXT NOT NULL,
    emergency_contact VARCHAR(15) NOT NULL
);

CREATE TABLE UserHealthData (
    username VARCHAR(50) PRIMARY KEY,
    height DECIMAL(5,2) NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    blood_group blood_group_enum NOT NULL,
    allergy TEXT NULL,
    ongoing_treatment TEXT NULL,
    FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE
);

CREATE TABLE Vaccines (
    username VARCHAR(50) NOT NULL,
    vaccine_name VARCHAR(100) NOT NULL,
    no_of_dose INT CHECK (no_of_dose > 0),
    year_administered INT NOT NULL,  -- YEAR replaced with INT
    administering_hospital VARCHAR(100) NULL,
    PRIMARY KEY (username, vaccine_name),
    FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE
);

CREATE TABLE OngoingMedication (
    username VARCHAR(50) NOT NULL,
    medication_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    prescribing_doc VARCHAR(100) NULL,
    PRIMARY KEY (username, medication_name),
    FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE
);

CREATE TABLE MedicalHistory (
    date DATE NOT NULL,
    username VARCHAR(50) NOT NULL,
    hospital_name VARCHAR(100) NOT NULL,
    diagnosis TEXT NOT NULL,
    PRIMARY KEY (date, username, hospital_name),
    FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE
);

CREATE TABLE LabReports (
    report_id SERIAL, -- Auto-increment primary key
    username VARCHAR(50) NOT NULL,
    data TEXT NOT NULL,
    report_file BYTEA NOT NULL,  -- LONGBLOB replaced with BYTEA
    PRIMARY KEY (report_id, username),
    FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE
);

CREATE TABLE Appointments (
    apt_id SERIAL PRIMARY KEY,  -- AUTO_INCREMENT replaced with SERIAL
    username VARCHAR(50) NOT NULL,
    hospital_name VARCHAR(100) NOT NULL,
    doctor_name VARCHAR(100) NOT NULL,
    appointment_date DATE NOT NULL,
    slot_id INT NOT NULL,  -- Fixed incorrect PRIMARY KEY usage
    FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE,
    FOREIGN KEY (slot_id) REFERENCES Slots(slot_id)
);

-- INSURANCE DATA
CREATE TABLE Insurance (
    insurance_id SERIAL PRIMARY KEY,  -- AUTO_INCREMENT replaced with SERIAL
    username VARCHAR(50) NOT NULL,
    provider_name VARCHAR(100) NOT NULL,
    policy_number VARCHAR(50) NOT NULL UNIQUE,
    FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE
);

CREATE TABLE InsurerData (
    policy_number VARCHAR(50) PRIMARY KEY,
    provider_name VARCHAR(100) NOT NULL,
    coverage_details TEXT NOT NULL,
    valid_from DATE NOT NULL,
    valid_until DATE NOT NULL,
    claim_limit DECIMAL(10,2) NOT NULL
);

-- HOSPITAL DATA
CREATE TABLE Hospitals (
    hosp_id SERIAL PRIMARY KEY,  -- AUTO_INCREMENT replaced with SERIAL
    hospital_name VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    type hospital_type_enum NOT NULL,
    ambulance_availability BOOLEAN NOT NULL DEFAULT TRUE,
    blood_bank_availability BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Doctors (
    doc_id SERIAL PRIMARY KEY,  -- AUTO_INCREMENT replaced with SERIAL
    hosp_id INT NOT NULL,
    doc_name VARCHAR(100) NOT NULL,
    speciality VARCHAR(100) NOT NULL,
    FOREIGN KEY (hosp_id) REFERENCES Hospitals(hosp_id) ON DELETE CASCADE
);

CREATE TABLE Slots (
    slot_id SERIAL PRIMARY KEY,  -- AUTO_INCREMENT replaced with SERIAL
    time TIME NOT NULL,
    timings VARCHAR(10) NOT NULL CHECK (timings IN ('8:30', '9:30', '10:30', '11:30', '12:30'))  -- ENUM replaced with CHECK constraint
);
