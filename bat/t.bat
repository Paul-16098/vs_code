@echo off
chcp 65001
cls

echo 請輸入一個參數:
set /p myParam=

echo ================================ >List.txt
if "%myParam%"=="" (
    set myParam=*
)

echo 僅包含副檔名 "%myParam%" >>List.txt
dir /b /o:e "%CD%\%myParam%" >>List.txt
echo ================================ >>List.txt
pause