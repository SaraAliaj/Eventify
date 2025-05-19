@echo off
echo Setting up Eventify Backend with MySQL...
echo.
echo IMPORTANT: Make sure MySQL server is running and properly configured
echo See MYSQL_SETUP.md for detailed instructions
echo.
cd Backend\Backend
echo Installing dependencies...
call npm install
echo Starting Node.js server...
call node project\main.js
pause 