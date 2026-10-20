param(
    [string]$ArtRoot = (Join-Path (Join-Path $PSScriptRoot '..') 'public/art'),
    [switch]$Apply
)
$ErrorActionPreference = 'Stop'
$root = [System.IO.Path]::GetFullPath($ArtRoot)
$map = Get-Content -Raw (Join-Path $PSScriptRoot 'radio-art-directory-map.json') | ConvertFrom-Json
if (-not (Test-Path -LiteralPath $root -PathType Container)) {
    throw "Artwork root not found: $root"
}
foreach ($entry in $map) {
    $source = Join-Path $root ($entry.from.Replace('/', [IO.Path]::DirectorySeparatorChar))
    $target = Join-Path $root ($entry.to.Replace('/', [IO.Path]::DirectorySeparatorChar))
    if (-not (Test-Path -LiteralPath $source -PathType Container)) {
        Write-Host "SKIP (source absent): $($entry.from)"
        continue
    }
    if (Test-Path -LiteralPath $target) {
        throw "Target already exists; refusing to overwrite: $($entry.to)"
    }
    if (-not $Apply) {
        Write-Host "DRY RUN: $($entry.from) -> $($entry.to)"
        continue
    }
    Move-Item -LiteralPath $source -Destination $target
    Write-Host "MOVED: $($entry.from) -> $($entry.to)"
}
if (-not $Apply) { Write-Host 'Preview only. Re-run with -Apply to rename.' }
