@echo off
chcp 65001 >nul
title WealthForge Quick Deploy

echo ==========================================
echo    WealthForge - Quick Deploy
echo ==========================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ERROR: package.json not found!
    echo Please run this script from the incomegpt folder.
    pause
    exit /b 1
)

echo [1/3] Committing and pushing changes...
git add -A
git commit -m "Quick deploy: %date% %time%" 2>nul
git push origin main

echo.
echo [2/3] Deploying to Vercel...
npx vercel --prod

echo.
echo ==========================================
echo    ✓ Done!
echo ==========================================
pause
