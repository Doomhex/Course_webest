@echo off
title EduFlow - Platform & Telegram Bot
echo ========================================================
echo   EduFlow - CRM & Telegram Bot Platform
echo   Dlya uchiteley, kursov i uchebnykh tsentrov
echo ========================================================
echo.
echo Zapusk servera na http://localhost:3000 ...

start "" http://localhost:3000
call .\node.cmd server-local.js

pause
