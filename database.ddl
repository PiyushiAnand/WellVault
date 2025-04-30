-- Drop Tables if they exist
DROP TABLE IF EXISTS Doctors CASCADE;
DROP TABLE IF EXISTS Hospitals CASCADE;
DROP TABLE IF EXISTS InsurerData CASCADE;
DROP TABLE IF EXISTS Insurance CASCADE;
DROP TABLE IF EXISTS AvailablePolicies CASCADE;
DROP TABLE IF EXISTS Appointments CASCADE;
DROP TABLE IF EXISTS Slots CASCADE;
DROP TABLE IF EXISTS LabReports CASCADE;
DROP TABLE IF EXISTS MedicalHistory CASCADE;
DROP TABLE IF EXISTS OngoingMedication CASCADE;
DROP TABLE IF EXISTS Vaccines CASCADE;
DROP TABLE IF EXISTS UserHealthData CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS OngoingTreatment CASCADE;

-- Drop ENUM types if they exist
DROP TYPE IF EXISTS gender_enum;
DROP TYPE IF EXISTS blood_group_enum;
DROP TYPE IF EXISTS hospital_type_enum;

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
    mobile_number VARCHAR(10) NOT NULL UNIQUE,
    gender gender_enum NOT NULL,
    address TEXT NOT NULL,
    emergency_contact VARCHAR(10) NOT NULL
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
    year_administered INT NOT NULL,  
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
    report_id SERIAL PRIMARY KEY,  
    username VARCHAR(50) NOT NULL,
    data TEXT NOT NULL,
    report_file BYTEA NOT NULL,  
    FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE
);
CREATE TABLE Slots (
    slot_id INTEGER PRIMARY KEY,  
    timings VARCHAR(10) NOT NULL CHECK (timings IN ('8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', '12:30 PM', '5:30 PM', '6:30 PM', '7:30 PM', '8:30 PM', '9:30 PM'))
);


CREATE TABLE Appointments (
    apt_id SERIAL PRIMARY KEY,  
    username VARCHAR(50) NOT NULL,
    hospital_name VARCHAR(100) NOT NULL,
    doctor_name VARCHAR(100) NOT NULL,
    appointment_date DATE NOT NULL,
    slot_id INT NOT NULL,  
    FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE,
    FOREIGN KEY (slot_id) REFERENCES Slots(slot_id)
);

-- TREATMENT 
CREATE TABLE OngoingTreatment (
    username VARCHAR(5) NOT NULL,
    Treatment_name VARCHAR(100) NOT NULL,
    doctor VARCHAR(50) NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    status TEXT CHECK (status IN ('Ongoing', 'Completed', 'Paused')),
    Description TEXT NOT NULL,
    PRIMARY KEY (Treatment_name, username),
    FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE
);


-- INSURANCE DATA
CREATE TABLE Insurance (
    insurance_id SERIAL PRIMARY KEY,  
    username VARCHAR(50) NOT NULL,
    provider_name VARCHAR(100) NOT NULL,
    policy_number VARCHAR(50) NOT NULL UNIQUE,
    FOREIGN KEY (username) REFERENCES Users(username) ON DELETE CASCADE
);

CREATE TABLE InsurerData (
    policy_number VARCHAR(50) PRIMARY KEY,
    provider_name VARCHAR(100) NOT NULL,
    coverage_details TEXT NOT NULL,
    valid_from DATE,
    valid_until DATE,
    claim_limit DECIMAL(10,2) NOT NULL
);

CREATE TABLE AvailablePolicies (
    policy_name VARCHAR(100) PRIMARY KEY,
    provider_name VARCHAR(100) NOT NULL,
    coverage_details TEXT NOT NULL,
    duration INTEGER NOT NULL,
    claim_limit DECIMAL(10,2) NOT NULL
);

-- HOSPITAL DATA
CREATE TABLE Hospitals (
    hosp_id SERIAL PRIMARY KEY,  
    hospital_name VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    address VARCHAR(500) NOT NULL,
    type hospital_type_enum NOT NULL,
    ambulance_availability BOOLEAN NOT NULL,
    blood_bank_availability BOOLEAN NOT NULL
);

CREATE TABLE Doctors (
    doc_id SERIAL PRIMARY KEY,  
    hosp_id INT NOT NULL,
    doc_name VARCHAR(100) NOT NULL,
    speciality VARCHAR(100) NOT NULL,
    FOREIGN KEY (hosp_id) REFERENCES Hospitals(hosp_id) ON DELETE CASCADE
);

CREATE TABLE Doctor_slots (
    doc_id INT not null,
    slot_id int not null,
    date TEXT NOT NULL,
    booked BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (doc_id, slot_id, date)
);