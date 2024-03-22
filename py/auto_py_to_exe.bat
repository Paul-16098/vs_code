echo off
cls
set "py_path=%1"
if "%py_path%"=="" (
    py -m auto_py_to_exe -lang zh_tw
) else (
    py -m auto_py_to_exe -lang zh_tw "%py_path%"
)
exit 0