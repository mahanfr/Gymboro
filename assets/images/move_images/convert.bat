@echo off
setlocal enabledelayedexpansion

set "OUTFOLDER=lowres_jpg"

if not exist "%OUTFOLDER%" (
    mkdir "%OUTFOLDER%"
)

REM Check ImageMagick
where magick >nul 2>nul
if errorlevel 1 (
    echo ImageMagick not installed.
    pause
    exit /b
)

echo Converting animated WEBP → first-frame low-res JPG...
echo.

for %%f in (*.webp) do (
    echo Processing: %%f
    REM Use [0] to extract first frame only
    magick "%%f[0]" -resize 20%% -quality 20 "%OUTFOLDER%\%%~nf.png"
)

echo.
echo Done!
pause
