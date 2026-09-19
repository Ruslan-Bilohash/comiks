@echo off
rem Komiks-Lab update: data check, neural voices, SEO and public build (dist)
cd /d "%~dp0.."
set PYTHONIOENCODING=utf-8
echo === 1/4 Checking data ===
node tools\check.js || goto :fail
echo === 2/4 Audio list ===
node tools\build-audio-list.js || goto :fail
echo === 3/4 Neural voices (only new phrases) ===
python tools\gen_audio.py || goto :fail
echo === 4/4 SEO and dist ===
node tools\build.js || goto :fail
echo.
echo DONE
pause
exit /b 0
:fail
echo.
echo ERROR - see messages above
pause
exit /b 1
