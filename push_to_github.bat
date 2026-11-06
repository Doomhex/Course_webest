@echo off
title Push to GitHub (Course_webest)
echo ========================================================
echo   Otpravka koda v GitHub: Doomhex/Course_webest
echo ========================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
  echo [USPEKH] Kod uspeshno zagruzhen v GitHub!
) else (
  echo [VMANIE] Esli poyavilsya zapros avtorizatsii, voydite cherez brauzer ili vvedite Personal Access Token.
)
pause

