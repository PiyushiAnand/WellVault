
-- insurance records
INSERT INTO Insurance (username, provider_name, policy_number) VALUES
('gola', 'CareWell', 'POL99999'),
('gola', 'HealthFirst', 'POL77777'),
('david', 'Apollo Health', 'POL44444'),
('emma', 'MediCare Plus', 'POL55555'),
('frank', 'SecureLife', 'POL66666'),
('geeta', 'HealthFirst', 'POL88888'),
('gola', 'SecureLife', 'POL10101'),
('harry', 'CareWell', 'POL20202'),
('irene', 'WellnessShield', 'POL30303'),
('jack', 'MediCare Plus', 'POL40404');

 -- Matching policy and provider entries
INSERT INTO InsurerData (policy_number, provider_name, coverage_details, valid_from, valid_until, claim_limit) VALUES
('POL99999', 'CareWell', 'Covers annual health checks and diagnostics', '2023-01-01', '2026-01-01', 100000.00),
('POL77777', 'HealthFirst', 'Comprehensive family coverage with zero copay', '2022-12-01', '2025-12-01', 400000.00),
('POL44444', 'Apollo Health', 'Corporate policy with mental health coverage', '2023-03-01', '2026-03-01', 600000.00),
('POL55555', 'MediCare Plus', 'Student health policy with OPD benefits', '2023-05-01', '2024-05-01', 150000.00),
('POL66666', 'SecureLife', 'Emergency-only coverage with accident insurance', '2021-01-01', '2024-01-01', 200000.00),
('POL88888', 'HealthFirst', 'Basic outpatient care and diagnostic tests', '2022-10-01', '2025-10-01', 180000.00),
('POL10101', 'SecureLife', 'Full-body annual scans and lifestyle disease coverage', '2023-07-01', '2026-07-01', 500000.00),
('POL20202', 'CareWell', 'Elderly plan with physiotherapy and rehab support', '2022-02-01', '2025-02-01', 300000.00),
('POL30303', 'WellnessShield', 'Extended OPD, mental wellness, and diet consultation', '2023-04-01', '2026-04-01', 350000.00),
('POL40404', 'MediCare Plus', 'Travel insurance + regular coverage', '2023-09-01', '2026-09-01', 250000.00);
