@echo off
echo ========================================
echo    ANIMEZ DEPLOYMENT SCRIPT
echo ========================================
echo.

echo Step 1: Deploy Backend to Render
echo Go to: https://render.com
echo 1. Sign up with GitHub
echo 2. Click New + Web Service
echo 3. Connect this GitHub repo
echo 4. Service Name: animez-backend
echo 5. Build Command: (leave empty)
echo 6. Start Command: ./pocketbase serve --http=0.0.0.0:$PORT
echo 7. Click Deploy
echo.
pause

echo Step 2: Deploy Frontend
npm install -g vercel
npm run build
vercel --prod

echo.
echo ========================================
echo    DEPLOYMENT COMPLETE!
echo ========================================
echo Your website is fully live!
echo Backend and frontend both deployed.
echo Anyone can access via the Vercel link.
echo.
pause