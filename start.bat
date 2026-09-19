@echo off
rem Opens the comics app in Microsoft Edge (best Norwegian/Ukrainian voices)
start "" msedge "%~dp0index.html"
if errorlevel 1 start "" "%~dp0index.html"
