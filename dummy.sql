-- Clear existing data
DELETE from AvailablePolicies;
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
('Apex Medical Institute', '122001', 'Sector 44, Gurgaon', 'Private', TRUE, FALSE),
('Health First Clinic', '400001', 'Andheri, Mumbai', 'Private', FALSE, TRUE),
('Metro Health Services', '110001', 'Connaught Place, Delhi', 'Public', TRUE, FALSE),
('Wellness Hospital', '560034', 'Indiranagar, Bangalore', 'Private', TRUE, TRUE),
('Care Plus Hospital', '122018', 'Sushant Lok, Gurgaon', 'Private', FALSE, TRUE),
('City Medical Centre', '400050', 'Dadar, Mumbai', 'Public', TRUE, FALSE),
('Sunshine Hospital', '110011', 'Lajpat Nagar, Delhi', 'Private', TRUE, TRUE),
('Green Valley Hospital', '560134', 'Koramangala, Bangalore', 'Public', TRUE, TRUE),
('Blue Cross Hospital', '122018', 'Golf Course Road, Gurgaon', 'Private', FALSE, TRUE),
('Red Cross Hospital', '400050', 'Bandra, Mumbai', 'Public', TRUE, FALSE),
('Fortis Hospital', '160011', 'Ajit Singh Nagar, Mohali', 'Private', TRUE, TRUE),
('Silver Oak Hospital', '560001', 'Brigade Road, Hyderabad', 'Public', FALSE, TRUE);

-- Insert Doctors
INSERT INTO Doctors (doc_name, hosp_id, speciality) VALUES
('Dr. Neha Sharma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital'), 'Cardiologist'),
('Dr. Anil Kapoor', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital'), 'Orthopedic'),
('Dr. Meera Joshi', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital'), 'Pediatrician'),
('Dr. Rajesh Malhotra', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital'), 'Neurologist'),
('Dr. Kavita Singh', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital'), 'Dermatologist'),
('Dr. Arvind Gupta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital'), 'General Physician'),


('Dr. Rakesh Kumar', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital'), 'General Physician'),
('Dr. Leena Das', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital'), 'Gynecologist'),
('Dr. Amit Verma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital'), 'ENT Specialist'),
('Dr. Sneha Iyer', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital'), 'Pediatrician'),
('Dr. Vikram Singh', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital'), 'Orthopedic'),
('Dr. Priya Nair', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital'), 'Cardiologist'),

('Dr. Sneha Verma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre'), 'Dermatologist'),
('Dr. Rohit Deshmukh', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre'), 'Neurologist'),
('Dr. Nisha Pillai', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre'), 'Ophthalmologist'),
('Dr. Sameer Khan', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre'), 'General Physician'),
('Dr. Anjali Mehta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre'), 'Gynecologist'),
('Dr. Rahul Joshi', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre'), 'Orthopedic'),

('Dr. Arjun Mehta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute'), 'Cardiologist'),
('Dr. Kiran Rao', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute'), 'Psychiatrist'),
('Dr. Priya Kumar', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute'), 'Oncologist'),
('Dr. Riya Sharma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute'), 'Dermatologist'),
('Dr. Vikram Bansal', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute'), 'General Physician'),
('Dr. Neeraj Gupta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute'), 'Orthopedic'),

('Dr. Aditi Mehta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic'), 'Cardiologist'),
('Dr. Sameer Kapoor', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic'), 'Dermatologist'),
('Dr. Priya Nair', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic'), 'Pediatrician'),
('Dr. Rahul Sharma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic'), 'Neurologist'),
('Dr. Kavita Singh', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic'), 'Orthopedic'),
('Dr. Anil Verma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic'), 'ENT Specialist'),

('Dr. Riya Kapoor', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services'), 'Cardiologist'),
('Dr. Vikram Singh', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services'), 'Dermatologist'),
('Dr. Sneha Joshi', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services'), 'Pediatrician'),
('Dr. Anjali Mehta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services'), 'Neurologist'),
('Dr. Arvind Gupta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services'), 'Orthopedic'),
('Dr. Priya Nair', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services'), 'ENT Specialist'),

('Dr. Neeraj Bansal', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital'), 'Cardiologist'),
('Dr. Kavita Sharma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital'), 'Dermatologist'),
('Dr. Rakesh Kumar', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital'), 'Pediatrician'),
('Dr. Anil Kapoor', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital'), 'Neurologist'),
('Dr. Priya Joshi', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital'), 'Orthopedic'),
('Dr. Sneha Iyer', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital'), 'ENT Specialist'),

('Dr. Arjun Mehta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Plus Hospital'), 'Cardiologist'),
('Dr. Kiran Rao', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Plus Hospital'), 'Dermatologist'),
('Dr. Priya Kumar', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Plus Hospital'), 'Pediatrician'),
('Dr. Riya Sharma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Plus Hospital'), 'Neurologist'),
('Dr. Vikram Bansal', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Plus Hospital'), 'Orthopedic'),
('Dr. Neeraj Gupta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Plus Hospital'), 'ENT Specialist'),

('Dr. Sneha Verma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre'), 'Cardiologist'),
('Dr. Rohit Deshmukh', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre'), 'Dermatologist'),
('Dr. Nisha Pillai', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre'), 'Pediatrician'),
('Dr. Sameer Khan', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre'), 'Neurologist'),
('Dr. Anjali Mehta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre'), 'Orthopedic'),
('Dr. Rahul Joshi', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre'), 'ENT Specialist'),

('Dr. Aditi Mehta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunshine Hospital'), 'Cardiologist'),
('Dr. Sameer Kapoor', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunshine Hospital'), 'Dermatologist'),
('Dr. Priya Nair', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunshine Hospital'), 'Pediatrician'),
('Dr. Rahul Sharma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunshine Hospital'), 'Neurologist'),
('Dr. Kavita Singh', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunshine Hospital'), 'Orthopedic'),
('Dr. Anil Verma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunshine Hospital'), 'ENT Specialist'),

('Dr. Riya Kapoor', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital'), 'Cardiologist'),
('Dr. Vikram Singh', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital'), 'Dermatologist'),
('Dr. Sneha Joshi', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital'), 'Pediatrician'),
('Dr. Anjali Mehta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital'), 'Neurologist'),
('Dr. Arvind Gupta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital'), 'Orthopedic'),
('Dr. Priya Nair', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital'), 'ENT Specialist'),

('Dr. Neeraj Bansal', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital'), 'Cardiologist'),
('Dr. Kavita Sharma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital'), 'Dermatologist'),
('Dr. Rakesh Kumar', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital'), 'Pediatrician'),
('Dr. Anil Kapoor', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital'), 'Neurologist'),
('Dr. Priya Joshi', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital'), 'Orthopedic'),
('Dr. Sneha Iyer', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital'), 'ENT Specialist'),

('Dr. Arjun Mehta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital'), 'Cardiologist'),
('Dr. Kiran Rao', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital'), 'Dermatologist'),
('Dr. Priya Kumar', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital'), 'Pediatrician'),
('Dr. Riya Sharma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital'), 'Neurologist'),
('Dr. Vikram Bansal', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital'), 'Orthopedic'),
('Dr. Neeraj Gupta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital'), 'ENT Specialist'),

('Dr. Neeraj Bansal', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital'), 'Cardiologist'),
('Dr. Kavita Sharma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital'), 'Dermatologist'),
('Dr. Rakesh Kumar', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital'), 'Pediatrician'),
('Dr. Anil Kapoor', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital'), 'Neurologist'),
('Dr. Priya Joshi', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital'), 'Orthopedic'),
('Dr. Sneha Iyer', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital'), 'ENT Specialist'),

('Dr. Aditi Mehta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital'), 'Cardiologist'),
('Dr. Sameer Kapoor', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital'), 'Dermatologist'),
('Dr. Priya Nair', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital'), 'Pediatrician'),
('Dr. Rahul Sharma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital'), 'Neurologist'),
('Dr. Kavita Singh', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital'), 'Orthopedic'),
('Dr. Anil Verma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital'), 'ENT Specialist'),

('Dr. Alok Mishra', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital'), 'Urologist'),
('Dr. Sneha Kapoor', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital'), 'Endocrinologist'),
('Dr. Rohan Das', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre'), 'Pulmonologist'),
('Dr. Kavya Iyer', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute'), 'Rheumatologist'),
('Dr. Arjun Singh', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic'), 'Gastroenterologist'),
('Dr. Priya Sharma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services'), 'Nephrologist'),
('Dr. Rakesh Verma', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital'), 'Hematologist'),
('Dr. Anjali Nair', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Plus Hospital'), 'Allergist'),
('Dr. Vikram Rao', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre'), 'Infectious Disease Specialist'),
('Dr. Neha Desai', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunshine Hospital'), 'Otolaryngologist'),
('Dr. Sameer Gupta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital'), 'Oncologist'),
('Dr. Kavita Bansal', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital'), 'Pathologist'),
('Dr. Rahul Mehta', (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital'), 'Radiologist');


-- Care Multispeciality Hospital
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Neha Sharma' AND s.slot_id IN (1, 2, 3, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (1, 2, 4, 5, 6, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Meera Joshi' AND s.slot_id IN (5,6,7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Rajesh Malhotra' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Kavita Singh' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Arvind Gupta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital')
AND d.doc_name = 'Dr. Alok Mishra' AND s.slot_id IN (1, 2, 3, 4, 5, 6);

-- Additional dates for each doctor in Care Multispeciality Hospital
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Neha Sharma' AND s.slot_id IN (1, 2, 3, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Neha Sharma' AND s.slot_id IN (1, 2, 3, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Neha Sharma' AND s.slot_id IN (1, 2, 3, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Neha Sharma' AND s.slot_id IN (1, 2, 3, 7, 8, 9);

-- Repeat similar blocks for each doctor in Care Multispeciality Hospital
-- Example for Dr. Anil Kapoor
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (1, 2, 4, 5, 6, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (1, 2, 4, 5, 6, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (1, 2, 4, 5, 6, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (1, 2, 4, 5, 6, 10);

-- repeat for all other doctors in Care Multispeciality Hospital
-- Repeat similar blocks for each doctor in Sunrise Government Hospital
-- Repeat for all other doctors in Care Multispeciality Hospital
-- Example for Dr. Meera Joshi
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Meera Joshi' AND s.slot_id IN (5, 6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Meera Joshi' AND s.slot_id IN (5, 6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Meera Joshi' AND s.slot_id IN (5, 6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Meera Joshi' AND s.slot_id IN (5, 6, 7, 8, 9, 10);

-- Example for Dr. Rajesh Malhotra
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Rajesh Malhotra' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Rajesh Malhotra' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Rajesh Malhotra' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Rajesh Malhotra' AND s.slot_id IN (1, 3, 5, 7, 9);

-- Example for Dr. Kavita Singh
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Kavita Singh' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Kavita Singh' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Kavita Singh' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Kavita Singh' AND s.slot_id IN (2, 4, 6, 8, 10);

-- Example for Dr. Arvind Gupta
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Arvind Gupta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Arvind Gupta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Arvind Gupta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Arvind Gupta' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Example for Dr. Alok Mishra
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Alok Mishra' AND s.slot_id IN (1, 2, 3, 4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Alok Mishra' AND s.slot_id IN (1, 2, 3, 4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Alok Mishra' AND s.slot_id IN (1, 2, 3, 4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Care Multispeciality Hospital') 
AND d.doc_name = 'Dr. Alok Mishra' AND s.slot_id IN (1, 2, 3, 4, 5, 6);




-- Example for Sunrise Government Hospital
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3, 8, 9, 10);

-- Continue for all doctors in all hospitals

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Sneha Iyer' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 3, 5, 7, 9);

-- Sunrise Government Hospital
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Leena Das' AND s.slot_id IN (1, 4, 5, 6, 7, 8);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Amit Verma' AND s.slot_id IN (1,2,3,7, 8, 9);

-- Additional dates for each doctor in Sunrise Government Hospital
-- Example for Dr. Rakesh Kumar
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Sneha Iyer' AND s.slot_id IN (1, 2, 3, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Sneha Iyer' AND s.slot_id IN (1, 2, 3, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Sneha Iyer' AND s.slot_id IN (1, 2, 3, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Sneha Iyer' AND s.slot_id IN (1, 2, 3, 8, 9, 10);

-- Example for Dr. Leena Das
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Leena Das' AND s.slot_id IN (1, 4, 5, 6, 7, 8);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Leena Das' AND s.slot_id IN (1, 4, 5, 6, 7, 8);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Leena Das' AND s.slot_id IN (1, 4, 5, 6, 7, 8);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Leena Das' AND s.slot_id IN (1, 4, 5, 6, 7, 8);

-- Example for Dr. Amit Verma
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Amit Verma' AND s.slot_id IN (1, 2, 3, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Amit Verma' AND s.slot_id IN (1, 2, 3, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Amit Verma' AND s.slot_id IN (1, 2, 3, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Amit Verma' AND s.slot_id IN (1, 2, 3, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Example for Dr. Priya Nair
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 3, 5, 7, 9);


INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Sneha Kapoor' AND s.slot_id IN (2, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Sneha Kapoor' AND s.slot_id IN (2, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Sneha Kapoor' AND s.slot_id IN (2, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Sneha Kapoor' AND s.slot_id IN (2, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Sunrise Government Hospital') 
AND d.doc_name = 'Dr. Sneha Kapoor' AND s.slot_id IN (2, 3, 5, 7, 9);

-- Example for City Health Centre
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Sameer Khan' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rahul Joshi' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Sneha Verma' AND s.slot_id IN (1, 2, 3, 7,8,9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rohit Deshmukh' AND s.slot_id IN (1,2,3,4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Nisha Pillai' AND s.slot_id IN (7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rohan Das' AND s.slot_id IN (5, 6, 8, 9, 10);


INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Sameer Khan' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rahul Joshi' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Sneha Verma' AND s.slot_id IN (1, 2, 3, 7,8,9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rohit Deshmukh' AND s.slot_id IN (1,2,3,4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Nisha Pillai' AND s.slot_id IN (7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rohan Das' AND s.slot_id IN (5, 6, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Sameer Khan' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rahul Joshi' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Sneha Verma' AND s.slot_id IN (1, 2, 3, 7,8,9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rohit Deshmukh' AND s.slot_id IN (1,2,3,4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Nisha Pillai' AND s.slot_id IN (7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rohan Das' AND s.slot_id IN (5, 6, 8, 9, 10);


INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Sameer Khan' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rahul Joshi' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Sneha Verma' AND s.slot_id IN (1, 2, 3, 7,8,9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rohit Deshmukh' AND s.slot_id IN (1,2,3,4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Nisha Pillai' AND s.slot_id IN (7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rohan Das' AND s.slot_id IN (5, 6, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Sameer Khan' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rahul Joshi' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Sneha Verma' AND s.slot_id IN (1, 2, 3, 7,8,9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rohit Deshmukh' AND s.slot_id IN (1,2,3,4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Nisha Pillai' AND s.slot_id IN (7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Health Centre') 
AND d.doc_name = 'Dr. Rohan Das' AND s.slot_id IN (5, 6, 8, 9, 10);



-- Additional slots for other doctors in Apex Medical Institute
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Riya Sharma' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Vikram Bansal' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Neeraj Gupta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Arjun Mehta' AND s.slot_id IN (1, 2, 3, 6, 7, 8);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Kiran Rao' AND s.slot_id IN (4, 5, 6, 8,9 , 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Priya Kumar' AND s.slot_id IN (4,5,6,7, 8, 9);


INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Kavya Iyer' AND s.slot_id IN (4,5,6, 8, 9, 10);

-- Additional dates for each doctor in Apex Medical Institute
-- Example for Dr. Riya Sharma
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Riya Sharma' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Riya Sharma' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Riya Sharma' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Riya Sharma' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Repeat for other doctors in Apex Medical Institute
-- Example for Dr. Vikram Bansal
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Vikram Bansal' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Vikram Bansal' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Vikram Bansal' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Vikram Bansal' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Repeat for Dr. Neeraj Gupta
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Neeraj Gupta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Neeraj Gupta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Neeraj Gupta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Neeraj Gupta' AND s.slot_id IN (1, 3, 5, 7, 9);

-- Repeat for Dr. Arjun Mehta
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Arjun Mehta' AND s.slot_id IN (1, 2, 3, 6, 7, 8);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Arjun Mehta' AND s.slot_id IN (1, 2, 3, 6, 7, 8);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Arjun Mehta' AND s.slot_id IN (1, 2, 3, 6, 7, 8);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Arjun Mehta' AND s.slot_id IN (1, 2, 3, 6, 7, 8);

-- Repeat for Dr. Kiran Rao
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Kiran Rao' AND s.slot_id IN (4, 5, 6, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Kiran Rao' AND s.slot_id IN (4, 5, 6, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Kiran Rao' AND s.slot_id IN (4, 5, 6, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Kiran Rao' AND s.slot_id IN (4, 5, 6, 8, 9, 10);

-- Repeat for Dr. Priya Kumar
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Priya Kumar' AND s.slot_id IN (4, 5, 6, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Priya Kumar' AND s.slot_id IN (4, 5, 6, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Priya Kumar' AND s.slot_id IN (4, 5, 6, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Priya Kumar' AND s.slot_id IN (4, 5, 6, 7, 8, 9);

-- Repeat for Dr. Kavya Iyer
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Kavya Iyer' AND s.slot_id IN (4, 5, 6, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Kavya Iyer' AND s.slot_id IN (4, 5, 6, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Kavya Iyer' AND s.slot_id IN (4, 5, 6, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Apex Medical Institute') 
AND d.doc_name = 'Dr. Kavya Iyer' AND s.slot_id IN (4, 5, 6, 8, 9, 10);

-- Repeat for all other hospitals and doctors
-- Example for Health First Clinic
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Aditi Mehta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Aditi Mehta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Aditi Mehta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Aditi Mehta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Aditi Mehta' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Repeat for other doctors in Health First Clinic
-- Example for Dr. Sameer Kapoor
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Sameer Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Sameer Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Sameer Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Sameer Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Sameer Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital') 
AND d.doc_name = 'Dr. Neeraj Bansal' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital') 
AND d.doc_name = 'Dr. Neeraj Bansal' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital') 
AND d.doc_name = 'Dr. Neeraj Bansal' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital') 
AND d.doc_name = 'Dr. Neeraj Bansal' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital') 
AND d.doc_name = 'Dr. Neeraj Bansal' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Repeat for other doctors in Wellness Hospital
-- Example for Dr. Kavita Sharma
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital') 
AND d.doc_name = 'Dr. Kavita Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital') 
AND d.doc_name = 'Dr. Kavita Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital') 
AND d.doc_name = 'Dr. Kavita Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital') 
AND d.doc_name = 'Dr. Kavita Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Wellness Hospital') 
AND d.doc_name = 'Dr. Kavita Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Repeat for all other hospitals and doctors
-- Repeat for all other hospitals and doctors
-- Example for Metro Health Services
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Riya Kapoor' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Riya Kapoor' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Riya Kapoor' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Riya Kapoor' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Riya Kapoor' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Repeat for other doctors in Metro Health Services
-- Example for Dr. Vikram Singh
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Example for Dr. Sneha Joshi
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Sneha Joshi' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Sneha Joshi' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Sneha Joshi' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Sneha Joshi' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Sneha Joshi' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Example for Dr. Anjali Mehta
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Example for Dr. Arvind Gupta
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Arvind Gupta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Arvind Gupta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Arvind Gupta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Arvind Gupta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Arvind Gupta' AND s.slot_id IN (1, 3, 5, 7, 9);

-- Example for Dr. Priya Nair
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-05', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Metro Health Services') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (2, 4, 6, 8, 10);

-- Repeat for all other hospitals and doctors
-- Example for City Medical Centre
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Sneha Verma' AND s.slot_id IN (1, 2, 3, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Sneha Verma' AND s.slot_id IN (1, 2, 3, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Sneha Verma' AND s.slot_id IN (1, 2, 3, 7, 8, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Sneha Verma' AND s.slot_id IN (1, 2, 3, 7, 8, 9);

-- Repeat for other doctors in City Medical Centre
-- Example for Dr. Rohit Deshmukh
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Rohit Deshmukh' AND s.slot_id IN (1, 2, 3, 4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Rohit Deshmukh' AND s.slot_id IN (1, 2, 3, 4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Rohit Deshmukh' AND s.slot_id IN (1, 2, 3, 4, 5, 6);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Rohit Deshmukh' AND s.slot_id IN (1, 2, 3, 4, 5, 6);

-- Repeat for other doctors in City Medical Centre
-- Continue for all other hospitals and doctors
-- Example for Dr. Nisha Pillai
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Nisha Pillai' AND s.slot_id IN (7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Nisha Pillai' AND s.slot_id IN (7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Nisha Pillai' AND s.slot_id IN (7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Nisha Pillai' AND s.slot_id IN (7, 8, 9, 10);

-- Example for Dr. Sameer Khan
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Sameer Khan' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Sameer Khan' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Sameer Khan' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Sameer Khan' AND s.slot_id IN (2, 4, 6, 8, 10);

-- Example for Dr. Anjali Mehta
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'City Medical Centre') 
AND d.doc_name = 'Dr. Anjali Mehta' AND s.slot_id IN (1, 3, 5, 7, 9);

-- Repeat for all other hospitals and doctors
-- Example for Health First Clinic
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Repeat for other doctors in Health First Clinic
-- Example for Dr. Rahul Sharma
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Rahul Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Rahul Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Rahul Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Rahul Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Continue for all other hospitals and doctors
-- Example for Dr. Priya Nair
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-07', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-08', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-21', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-30', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Example for Dr. Kavita Singh
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Kavita Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Kavita Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Kavita Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Kavita Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Example for Dr. Sameer Kapoor
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Sameer Kapoor' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Sameer Kapoor' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Sameer Kapoor' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Health First Clinic') 
AND d.doc_name = 'Dr. Sameer Kapoor' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Repeat for all other hospitals and doctors
-- Example for Fortis Hospital
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Neeraj Bansal' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Neeraj Bansal' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Neeraj Bansal' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Neeraj Bansal' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Repeat for other doctors in Fortis Hospital
-- Example for Dr. Kavita Sharma
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Kavita Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Kavita Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Kavita Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Kavita Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Continue for all other hospitals and doctors
-- Example for Dr. Rakesh Kumar
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Example for Dr. Anil Kapoor
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Example for Dr. Priya Joshi
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Priya Joshi' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Priya Joshi' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Priya Joshi' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Priya Joshi' AND s.slot_id IN (1, 3, 5, 7, 9);

-- Example for Dr. Sneha Iyer
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Sneha Iyer' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Sneha Iyer' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Sneha Iyer' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Fortis Hospital') 
AND d.doc_name = 'Dr. Sneha Iyer' AND s.slot_id IN (2, 4, 6, 8, 10);

-- Repeat for all other hospitals and doctors
-- Example for Silver Oak Hospital
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Aditi Mehta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Aditi Mehta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Aditi Mehta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Aditi Mehta' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Repeat for other doctors in Silver Oak Hospital
-- Example for Dr. Sameer Kapoor
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Sameer Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Sameer Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Sameer Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Sameer Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Continue for all other hospitals and doctors
-- Example for Dr. Priya Nair
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Priya Nair' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Example for Dr. Rahul Sharma
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Rahul Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Rahul Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Rahul Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Rahul Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Example for Dr. Kavita Singh
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Kavita Singh' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Kavita Singh' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Kavita Singh' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Kavita Singh' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Example for Dr. Anil Verma
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Anil Verma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Anil Verma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Anil Verma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Silver Oak Hospital') 
AND d.doc_name = 'Dr. Anil Verma' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Repeat for all other hospitals and doctors
-- Example for Green Valley Hospital
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital') 
AND d.doc_name = 'Dr. Riya Kapoor' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital') 
AND d.doc_name = 'Dr. Riya Kapoor' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital') 
AND d.doc_name = 'Dr. Riya Kapoor' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital') 
AND d.doc_name = 'Dr. Riya Kapoor' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Repeat for other doctors in Green Valley Hospital
-- Example for Dr. Vikram Singh
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Green Valley Hospital') 
AND d.doc_name = 'Dr. Vikram Singh' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Continue for all other hospitals and doctors
-- Repeat for all other hospitals and doctors
-- Example for Blue Cross Hospital
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Neeraj Bansal' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Neeraj Bansal' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Neeraj Bansal' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Neeraj Bansal' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Repeat for other doctors in Blue Cross Hospital
-- Example for Dr. Kavita Sharma
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Kavita Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Kavita Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Kavita Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Kavita Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Example for Dr. Rakesh Kumar
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Rakesh Kumar' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Example for Dr. Anil Kapoor
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Anil Kapoor' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Example for Dr. Priya Joshi
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Priya Joshi' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Priya Joshi' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Priya Joshi' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Priya Joshi' AND s.slot_id IN (1, 3, 5, 7, 9);

-- Example for Dr. Sneha Iyer
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Sneha Iyer' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Sneha Iyer' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Sneha Iyer' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Blue Cross Hospital') 
AND d.doc_name = 'Dr. Sneha Iyer' AND s.slot_id IN (2, 4, 6, 8, 10);

-- Continue for all other hospitals and doctors
-- Repeat for all other hospitals and doctors
-- Example for Red Cross Hospital
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Arjun Mehta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Arjun Mehta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Arjun Mehta' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Arjun Mehta' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Example for Dr. Kiran Rao
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Kiran Rao' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Kiran Rao' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Kiran Rao' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Kiran Rao' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Continue for all other doctors in Red Cross Hospital
-- Example for Dr. Priya Kumar
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Priya Kumar' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Priya Kumar' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Priya Kumar' AND s.slot_id IN (1, 2, 3, 4, 5);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Priya Kumar' AND s.slot_id IN (1, 2, 3, 4, 5);

-- Example for Dr. Riya Sharma
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Riya Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Riya Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Riya Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Riya Sharma' AND s.slot_id IN (6, 7, 8, 9, 10);

-- Example for Dr. Vikram Bansal
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Vikram Bansal' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Vikram Bansal' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Vikram Bansal' AND s.slot_id IN (1, 3, 5, 7, 9);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Vikram Bansal' AND s.slot_id IN (1, 3, 5, 7, 9);

-- Example for Dr. Neeraj Gupta
INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-02', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Neeraj Gupta' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-03', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Neeraj Gupta' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-04', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Neeraj Gupta' AND s.slot_id IN (2, 4, 6, 8, 10);

INSERT INTO Doctor_slots (doc_id, slot_id, date, booked)
SELECT d.doc_id, s.slot_id, '2025-05-06', FALSE
FROM Doctors d, Slots s
WHERE d.hosp_id = (SELECT hosp_id FROM Hospitals WHERE hospital_name = 'Red Cross Hospital') 
AND d.doc_name = 'Dr. Neeraj Gupta' AND s.slot_id IN (2, 4, 6, 8, 10);



INSERT INTO AvailablePolicies (policy_name, provider_name, coverage_details, duration, claim_limit) VALUES
('HealthSecure Basic', 'MediCare Plus', 'Covers hospitalization, emergency care, and basic diagnostics.', 24, 50000.00),
('LifeShield Premium', 'LifeCare Inc.', 'Comprehensive life insurance with accidental coverage.', 36, 100000.00),
('MediAssist Gold', 'Wellness First', 'Covers hospitalization, surgery, maternity and wellness checkups.', 24, 75000.00),
('SeniorCare Plan', 'Golden Years Health', 'Specialized plan for seniors above 60, includes home visits.', 18, 60000.00),
('FamilyHealth Combo', 'FamilyFirst', 'Covers up to 4 family members including dental and vision.', 12, 85000.00),
('StudentHealth Safe', 'CampusCare', 'For students: covers OPD, mental health, and accidental care.', 12, 30000.00),
('CancerShield', 'Hope Health', 'Dedicated cancer coverage including chemo and radiation.', 60, 150000.00),
('TravelSecure', 'GlobeCare', 'Covers medical emergencies and baggage loss during travel.', 9, 20000.00),
('DiabetesPlus', 'SugarCare', 'Plans tailored for diabetic patients including diagnostics.', 6, 45000.00),
('MaternityCare Plan', 'NewLife Insurance', 'Maternity-related expenses including newborn cover.', 9, 55000.00),
('Wellness360', 'FitLiving', 'Annual wellness and fitness monitoring coverage.', 54, 25000.00),
('AccidentProtect', 'SafeSteps', 'Covers accidental injuries, fractures, and emergency treatment.', 24, 40000.00),
('HeartSecure', 'CardioPlus', 'Covers heart surgeries, stent implants, and recovery.', 36, 120000.00),
('PetCare Basic', 'PetWell', 'Covers basic vet visits and vaccinations for pets.', 9, 15000.00),
('CyberHealth', 'DigitalCare', 'Mental health and ergonomic support for remote workers.', 48, 35000.00);