@echo off
setlocal enabledelayedexpansion

REM ====== Create output folder ======
set "OUTFOLDER=lowres_jpg"
if not exist "%OUTFOLDER%" (
    mkdir "%OUTFOLDER%"
)

REM ====== Check ImageMagick availability ======
where magick >nul 2>nul
if errorlevel 1 (
    echo ImageMagick not found. Install it first:
    echo https://imagemagick.org
    pause
    exit /b
)

echo Converting WEBP -> low resolution JPG...
echo Output folder: %OUTFOLDER%
echo.

REM ====== Convert each WEBP file ======
for %%f in (*.webp) do (
    echo Processing "%%f"...
    magick "%%f" -resize 20% -quality 20 "%OUTFOLDER%\%%~nf.jpg"
)

echo.
echo Done!
pause
