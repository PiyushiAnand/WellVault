# DBIS PROJECT 

This repository is privately owned by Piyushi, Mithila, Urvi and Aakriti. It comprises of a web app, with reference of the website ABHA. It's a medical app to keep a track on your health records, bills, ongoing treatments, insurance and appointments.

## FRONTEND

Frontend Directories modified:
1. /WellVault/frontend/src/layouts/authentication
2. /WellVault/frontend/src/layouts/dashboard
3. /WellVault/frontend/src/layouts/homepage
4. /WellVault/frontend/App.js
5. /WellVault/frontend/public/index.html
6. /WellVault/frontend/src/assets
7. /WellVault/frontend/src/routes.js

Frontend Directories added:
1. /WellVault/frontend/src/layouts/insurance
2. /WellVault/frontend/src/layouts/lab-reports
3. /WellVault/frontend/src/layouts/medical-history
4. /WellVault/frontend/src/layouts/prescriptions
5. /WellVault/frontend/src/layouts/profile
6. /WellVault/frontend/src/layouts/treatment
7. /WellVault/frontend/src/layouts/vaccines
8. /WellVault/frontend/src/layouts/ambulance
9. /WellVault/frontend/src/layouts/appointment
10. /WellVault/frontend/src/layouts/authentication/hospital_signin
11. /WellVault/frontend/src/layouts//authentication/hospital_signup
12. /WellVault/frontend/src/layouts/bloodbank
13. /WellVault/frontend/src/layouts/doctors
14. /WellVault/frontend/src/layouts/empty_slots
15. /WellVault/frontend/src/layouts/hospitaldashboard
16. /WellVault/frontend/src/layouts/notifications
17. /WellVault/frontend/src/layouts/patients
19. /WelVault/frontend/src/hospt_routes.js

## BACKEND 
Backend Files modified :
1. /WellVault/backend/app.js

## DDL Files 
1. /WellVault/database.ddl
2. /WellVault/dummy.sql

## How to run the application
1. Backend
   cd backend
   npm install 
   make sure you have node.js version v16 or higher to ensure correct version
   nvm use 16
   node app.js
2. Frontend
   cd frontend
   npm install
   npm start

   Note : please load the ddl & sql files present in the WellVault directory into your psql database and include your user and database credentials in the backend/app.js file



