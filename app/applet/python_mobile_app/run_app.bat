@echo off
chcp 65001 >nul
title FP DROP — Mobilný Prototyp (Python)

echo ========================================================
echo   FP DROP — MOBILNÝ PROTOTYP PRE VS CODE & WINDOWS
echo   Fakulta podnikatelská VUT v Brně
echo ========================================================
echo.

:: Test py launcher (Windows default Python Launcher)
where py >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [+] Nájdený spúšťač 'py'. Štartujem aplikáciu...
    py main.py
    goto end
)

:: Test python command
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [+] Nájdený 'python'. Štartujem aplikáciu...
    python main.py
    goto end
)

:: Test python3 command
where python3 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [+] Nájdený 'python3'. Štartujem aplikáciu...
    python3 main.py
    goto end
)

:: If none found
echo [!] CHYBA: Python nebol nájdený v systéme Windows.
echo.
echo Možnosti riešenia:
echo 1. Skúste v PowerShell zadať príkaz: winget install Python.Python.3.12
echo 2. Alebo stiahnite Python z https://www.python.org/downloads/
echo    DÔLEŽITÉ: Pri inštalácii zaškrtnite políčko "Add python.exe to PATH"!
echo 3. Ak už máte Python nainštalovaný, otvorte:
echo    Nastavenia Windows ^> Aplikácie ^> Rozšírené nastavenia aplikácií ^> Zástupcovia spustenia aplikácií
echo    a VYPNITE prepínač pre "Python" a "Python3" (App execution aliases).
echo.
pause

:end
