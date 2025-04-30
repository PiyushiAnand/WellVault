-- Clear existing data
DELETE FROM doctor_slots;
DELETE FROM doctors;
DELETE FROM hospitals;
DELETE FROM slots;

-- Insert into Slots
INSERT INTO Slots (slot_id, timings) VALUES
('1','8:30 AM'),
('2','9:30 AM'),
('3','10:30 AM'),
('4','11:30 AM'),
('5','12:30 PM'),
('6','5:30 PM'),
('7','6:30 PM'),
('8','7:30 PM'),
('9','8:30 PM'),
('10','9:30 PM');

-- Insert Hospitals
INSERT INTO Hospitals (hospital_name, pincode, address, type, ambulance_availability, blood_bank_availability) 
VALUES
('Care Multispeciality Hospital', '110034', '101, Sector 5, Rohini, Delhi', 'Private', TRUE, TRUE),
('Sunrise Government Hospital', '560001', 'M G Road, Bangalore', 'Public', TRUE, TRUE),
('City Health Centre', '400001', 'Marine Lines, Mumbai', 'Public', FALSE, TRUE),
('Apex Medical Institute', '122001', 'Sector 44, Gurgaon', 'Private', TRUE, FALSE);

-- Insert Doctors
INSERT INTO Doctors (doc_name, hosp_id, speciality) VALUES
('Dr. Neha Sharma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital'), 'Cardiologist'),
('Dr. Anil Kapoor', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital'), 'Orthopedic'),
('Dr. Meera Joshi', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital'), 'Pediatrician'),

('Dr. Rakesh Kumar', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital'), 'General Physician'),
('Dr. Leena Das', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital'), 'Gynecologist'),
('Dr. Amit Verma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital'), 'ENT Specialist'),

('Dr. Sneha Verma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre'), 'Dermatologist'),
('Dr. Rohit Deshmukh', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre'), 'Neurologist'),
('Dr. Nisha Pillai', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre'), 'Ophthalmologist'),

('Dr. Arjun Mehta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute'), 'Cardiologist'),
('Dr. Kiran Rao', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute'), 'Psychiatrist'),
('Dr. Priya Kumar', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute'), 'Oncologist');
-- Insert Doctors
-- (Same as before, using SELECTs with WHERE conditions on hospital_name)
-- [unchanged doctor INSERT statements]

-- Insert Doctor Slots with updated dates (2025-05-05 and 2025-05-06)
-- Care Multispeciality Hospital
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Neha Sharma' AND s.slot_id IN (1, 2, 3);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Meera Joshi' AND s.slot_id IN (7, 8, 9);

-- Sunrise Government Hospital
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Leena Das' AND s.slot_id IN (4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Amit Verma' AND s.slot_id IN (7, 8, 9);

-- City Health Centre
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Sneha Verma' AND s.slot_id IN (1, 2, 3);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rohit Deshmukh' AND s.slot_id IN (4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Nisha Pillai' AND s.slot_id IN (7, 8, 9);

-- Apex Medical Institute
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Arjun Mehta' AND s.slot_id IN (1, 2, 3);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Kiran Rao' AND s.slot_id IN (4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Priya Kumar' AND s.slot_id IN (7, 8, 9);

-- Extra day for Dr. Priya Kumar
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Priya Kumar' AND s.slot_id IN (7, 8, 9);


