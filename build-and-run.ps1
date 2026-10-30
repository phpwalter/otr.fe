# Build and start the Classic Radio Vault Vite development server.
$ErrorActionPreference = 'Stop'

Set-Location -LiteralPath $PSScriptRoot

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error 'npm was not found. Install Node.js and reopen PowerShell.'
    exit 1
}

if (-not (Test-Path -LiteralPath 'package.json')) {
    Write-Error "No package.json found in $PSScriptRoot. Put this script in the otr.fe project root."
    exit 1
}

Write-Host 'Building Classic Radio Vault...' -ForegroundColor Cyan
& npm.cmd run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed (exit code $LASTEXITCODE). Server not started."
    exit $LASTEXITCODE
}

Write-Host 'Build succeeded. Starting Vite development server...' -ForegroundColor Green
Write-Host 'Open the URL displayed below. Press Ctrl+C to stop.' -ForegroundColor Cyan
& npm.cmd run dev
exit $LASTEXITCODE
