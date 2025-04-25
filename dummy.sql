DELETE from doctor_slots;
DELETE from doctors;
DELETE from hospitals;
DELETE from slots;
INSERT INTO Slots (slot_id,timings) VALUES
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

-- HOSPITAL DATA
INSERT INTO Hospitals (hospital_name, pincode, address, type, ambulance_availability, blood_bank_availability) 
VALUES
('Care Multispeciality Hospital', '110034', '101, Sector 5, Rohini, Delhi', 'Private', TRUE, TRUE),
('Sunrise Government Hospital', '560001', 'M G Road, Bangalore', 'Public', TRUE, TRUE),
('City Health Centre', '400001', 'Marine Lines, Mumbai', 'Public', FALSE, TRUE),
('Apex Medical Institute', '122001', 'Sector 44, Gurgaon', 'Private', TRUE, FALSE);

-- DOCTORS DATA (Multiple Doctors per Hospital)
-- Care Multispeciality Hospital
INSERT INTO Doctors (hosp_id, doc_name, speciality)
SELECT hosp_id, 'Dr. Neha Sharma', 'Neurologist' FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital';

INSERT INTO Doctors (hosp_id, doc_name, speciality)
SELECT hosp_id, 'Dr. Anil Kapoor', 'Cardiologist' FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital';

INSERT INTO Doctors (hosp_id, doc_name, speciality)
SELECT hosp_id, 'Dr. Meera Joshi', 'Orthopedic Surgeon' FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital';

-- Sunrise Government Hospital
INSERT INTO Doctors (hosp_id, doc_name, speciality)
SELECT hosp_id, 'Dr. Rakesh Kumar', 'General Physician' FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital';

INSERT INTO Doctors (hosp_id, doc_name, speciality)
SELECT hosp_id, 'Dr. Leena Das', 'Dermatologist' FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital';

INSERT INTO Doctors (hosp_id, doc_name, speciality)
SELECT hosp_id, 'Dr. Amit Verma', 'ENT Specialist' FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital';

-- City Health Centre
INSERT INTO Doctors (hosp_id, doc_name, speciality)
SELECT hosp_id, 'Dr. Sneha Verma', 'Pediatrician' FROM Hospitals WHERE hospital_name = 'City Health Centre';

INSERT INTO Doctors (hosp_id, doc_name, speciality)
SELECT hosp_id, 'Dr. Rohit Deshmukh', 'Ophthalmologist' FROM Hospitals WHERE hospital_name = 'City Health Centre';

INSERT INTO Doctors (hosp_id, doc_name, speciality)
SELECT hosp_id, 'Dr. Nisha Pillai', 'Gynecologist' FROM Hospitals WHERE hospital_name = 'City Health Centre';

-- Apex Medical Institute
INSERT INTO Doctors (hosp_id, doc_name, speciality)
SELECT hosp_id, 'Dr. Arjun Mehta', 'Psychiatrist' FROM Hospitals WHERE hospital_name = 'Apex Medical Institute';

INSERT INTO Doctors (hosp_id, doc_name, speciality)
SELECT hosp_id, 'Dr. Kiran Rao', 'Urologist' FROM Hospitals WHERE hospital_name = 'Apex Medical Institute';

INSERT INTO Doctors (hosp_id, doc_name, speciality)
SELECT hosp_id, 'Dr. Priya Kumar', 'General Surgeon' FROM Hospitals WHERE hospital_name = 'Apex Medical Institute';

-- DOCTOR SLOTS (Multiple Slots for Each Doctor)
-- Care Multispeciality Hospital
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-04-26', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Neha Sharma' AND s.slot_id IN (1, 2, 3);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-04-26', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-04-26', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Meera Joshi' AND s.slot_id IN (7, 8, 9);

-- Sunrise Government Hospital
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-04-26', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-04-26', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Leena Das' AND s.slot_id IN (4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-04-26', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Amit Verma' AND s.slot_id IN (7, 8, 9);

-- City Health Centre
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-04-26', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Sneha Verma' AND s.slot_id IN (1, 2, 3);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-04-26', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rohit Deshmukh' AND s.slot_id IN (4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-04-26', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Nisha Pillai' AND s.slot_id IN (7, 8, 9);

-- Apex Medical Institute
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-04-26', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Arjun Mehta' AND s.slot_id IN (1, 2, 3);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-04-26', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Kiran Rao' AND s.slot_id IN (4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-04-26', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Priya Kumar' AND s.slot_id IN (7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-04-27', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Priya Kumar' AND s.slot_id IN (7, 8, 9);
