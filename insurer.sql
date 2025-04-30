-- -- insurance records
-- INSERT INTO Insurance (username, provider_name, policy_number) VALUES
-- ('gola', 'CareWell', 'POL99999'),
-- ('gola', 'HealthFirst', 'POL77777'),
-- ('david', 'Apollo Health', 'POL44444'),
-- ('emma', 'MediCare Plus', 'POL55555'),
-- ('frank', 'SecureLife', 'POL66666'),
-- ('geeta', 'HealthFirst', 'POL88888'),
-- ('gola', 'SecureLife', 'POL10101'),
-- ('harry', 'CareWell', 'POL20202'),
-- ('irene', 'WellnessShield', 'POL30303'),
-- ('jack', 'MediCare Plus', 'POL40404');

-- DELETE from doctors;
-- DELETE from doctor_slots;
DELETE from AvailablePolicies;


-- INSERT INTO Doctor_slots (doc_id, slot_id, date, booked) VALUES

-- (5, 1, '2025-04-24', FALSE),
-- (6, 2, '2025-04-24', FALSE),
-- (7, 3, '2025-04-24', FALSE),
-- (8, 4, '2025-04-24', FALSE),
-- (8, 3, '2025-04-24', FALSE),
-- -- Dr. Aditi Sharma on 25th April
-- (5, 1, '2025-04-25', FALSE),
-- (6, 2, '2025-04-25', FALSE),
-- (7, 3, '2025-04-25', FALSE),
-- (8, 4, '2025-04-25', FALSE),
-- (8, 3, '2025-04-25', FALSE),

-- -- Dr. Aditi Sharma on 25th April
-- (7, 1, '2025-04-26', FALSE),
-- (8, 2, '2025-04-26', FALSE),
-- (6, 3, '2025-04-26', FALSE);


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
