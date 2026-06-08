@echo off
rem Start the local VitePress preview server (Windows counterpart of dev.sh).
rem
rem Usage:
rem   dev.bat            run dev mode (hot reload, recommended for writing docs)
rem   dev.bat build      production build into docs\.vitepress\dist
rem   dev.bat preview    preview the production build (run `build` first)
rem
rem To force a fresh install, delete the node_modules folder and re-run.

setlocal enabledelayedexpansion

pushd "%~dp0"

rem Pick a package manager. Prefer pnpm; fall back to npm.
set "PM="
where pnpm >nul 2>&1
if !ERRORLEVEL! equ 0 set "PM=pnpm"
if "!PM!"=="" (
    where npm >nul 2>&1
    if !ERRORLEVEL! equ 0 set "PM=npm"
)
if "!PM!"=="" (
    echo [dev.bat] Error: neither pnpm nor npm is installed. 1>&2
    echo           Install Node.js 20+ and pnpm, then re-run. 1>&2
    popd
    exit /b 1
)

rem Bail out early if Node is too old to run VitePress.
where node >nul 2>&1
if !ERRORLEVEL! equ 0 (
    for /f "tokens=1 delims=." %%i in ('node -e "console.log(process.versions.node)"') do set "NODE_MAJOR=%%i"
    if !NODE_MAJOR! lss 20 (
        echo [dev.bat] Error: Node.js ^>= 20 required. 1>&2
        popd
        exit /b 1
    )
)

rem Install dependencies on first run.
if not exist node_modules (
    echo [dev.bat] Installing dependencies with !PM!...
    call !PM! install
    if !ERRORLEVEL! neq 0 (
        popd
        exit /b !ERRORLEVEL!
    )
)

set "CMD=%~1"
if "!CMD!"=="" set "CMD=dev"

if /i "!CMD!"=="dev" goto :run
if /i "!CMD!"=="build" goto :run
if /i "!CMD!"=="preview" goto :run

echo [dev.bat] Unknown command: !CMD! 1>&2
echo          Usage: %~nx0 [dev ^| build ^| preview] 1>&2
popd
exit /b 2

:run
echo [dev.bat] Running: !PM! run !CMD!
call !PM! run !CMD!
set "RC=!ERRORLEVEL!"
popd
exit /b !RC!
