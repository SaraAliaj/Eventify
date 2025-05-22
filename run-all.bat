@echo off
echo Starting Eventify application...

:: Start backend in a new window
start cmd /k "cd Backend/Backend && node project/main.js"

:: Wait for backend to start
timeout /t 3

:: Start frontend in a new window  
start cmd /k "cd frontend && npm start"

echo Eventify servers started successfully!
echo Backend running on http://localhost:5000
echo Frontend running on http://localhost:3000

:: Inform about admin credentials
echo.
echo Use these credentials to log in as admin:
echo Email: admin@eventify.com  
echo Password: admin123
echo.
echo To create the admin user, run Backend/Backend/create-admin.bat

pause 