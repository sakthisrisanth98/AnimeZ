@echo off
echo Installing Vercel CLI...
npm install -g vercel

echo.
echo Deploying to Vercel...
vercel --prod

echo.
echo Your website will be live at the URL shown above!
echo Both frontend and backend are connected.
pause