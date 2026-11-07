@echo off
title LinguaPro Center CRM & Telegram Bot
echo ========================================================
echo   LinguaPro Center - CRM ^& Telegram Bot Platform
echo   Telegram Desktop UI + Banking Privacy + Analytics
echo ========================================================
echo.
echo Zapusk servera na http://localhost:3000 ...

start "" http://localhost:3000
call .\node.cmd server-local.js

pause
