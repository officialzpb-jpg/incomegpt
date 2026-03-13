@echo off
chcp 65001 >nul
title WealthForge Auto Deploy
setlocal enabledelayedexpansion

echo ==========================================
echo    WealthForge - Auto Deploy to Vercel
echo ==========================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ERROR: package.json not found!
    echo Please run this script from the incomegpt folder.
    pause
    exit /b 1
)

echo [1/5] Checking for changes...
git status --short

REM Check if there are any changes
for /f %%i in ('git status --porcelain ^| find /c /v ""') do set CHANGES=%%i

if %CHANGES%==0 (
    echo.
    echo No local changes to commit.
    goto :deploy
) else (
    echo.
    echo Found %CHANGES% changed file(s).
)

echo.
echo [2/5] Staging changes...
git add -A
if errorlevel 1 (
    echo ERROR: Failed to stage changes.
    pause
    exit /b 1
)
echo ✓ Changes staged.

echo.
echo [3/5] Committing changes...
set /p COMMIT_MSG="Enter commit message (or press Enter for default): "
if "!COMMIT_MSG!"=="" set COMMIT_MSG=Auto-deploy update

git commit -m "!COMMIT_MSG!"
if errorlevel 1 (
    echo ERROR: Failed to commit changes.
    pause
    exit /b 1
)
echo ✓ Changes committed.

echo.
echo [4/5] Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo ERROR: Failed to push to GitHub.
    pause
    exit /b 1
)
echo ✓ Pushed to GitHub.

:deploy
echo.
echo [5/5] Deploying to Vercel...
echo.
echo Running: npx vercel --prod
echo.

REM Deploy to Vercel (production) using npx
npx vercel --prod

if errorlevel 1 (
    echo.
    echo ERROR: Deployment failed.
    echo.
    echo If this is your first time deploying, run: npx vercel
    echo Then run this script again.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo    ✓ Deployment Complete!
echo ==========================================
echo.
pause
