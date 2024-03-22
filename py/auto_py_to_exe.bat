echo off
cls
set "py_path=%1"
if "%py_path%"=="" (
    py -m auto_py_to_exe -nc -lang zh_tw -c "C:\Users\p\Documents\vs_code\py\default_cofg.json"
) else (
    py -m auto_py_to_exe -nc -lang zh_tw -c "C:\Users\p\Documents\vs_code\py\default_cofg.json" "%py_path%"
)
exit 0