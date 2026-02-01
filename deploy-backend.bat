@echo off
echo Installing Fly CLI...
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

echo.
echo Please run these commands manually:
echo 1. fly auth login
echo 2. fly launch --name animez-backend
echo 3. fly deploy
echo.
echo After deployment, copy the URL and update frontend config
pause