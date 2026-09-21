# Derives the web-ready DOT brand assets from the design source files in
# "Novos assets". Re-runnable: safe to execute any time the source art changes.
#
#   npm run assets
#
# Geometry below was measured from the sources with scripts/ImgTool.ps1.
#
# Novos assets/Logo.png (1774x887) already ships real transparency, so no colour
# keying is needed - we only crop. Within it:
#   D          x 258..687    y 241..549
#   O (mark)   x 714..1088   y 223..563   <- the disc with the lightning bolt
#   T          x 1103..1503  y 241..549
#   (R)        x 1518..1604  y 183..328
#   tagline    x 247..1528   y 605..689   "Sell in Angola. Get paid globally."
#
# Novos assets/World.png (1712x919) is already composed with the globe on the
# right and clear space on the left, at almost exactly the aspect ratio of the
# bridge panel, so it is copied through untouched.

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$root = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot 'ImgTool.ps1')

$src = Join-Path $root 'Novos assets'
$logo = Join-Path $src 'Logo.png'
$world = Join-Path $src 'World.png'

$brandDir = Join-Path $root 'public\brand'
$imgDir = Join-Path $root 'public\images'
$appDir = Join-Path $root 'src\app'
foreach ($d in @($brandDir, $imgDir, $appDir)) { New-Item -ItemType Directory -Force -Path $d | Out-Null }

# Brand navy, sampled from World.png and Dashboard.png.
$bgR, $bgG, $bgB = 0, 19, 48

Write-Host 'Extracting DOT brand assets...' -ForegroundColor Cyan

# Wordmark: D O T only. The (R) is deliberately left out of the UI lockup, and a
# 6px bleed keeps the anti-aliased edges from being clipped.
[ImgTool]::Crop($logo, (Join-Path $brandDir 'dot-wordmark.png'), 252, 217, 1258, 353, 1024)

# Standalone O - the hero flow node and the app icons.
[ImgTool]::Crop($logo, (Join-Path $brandDir 'dot-mark.png'), 708, 217, 387, 353, 0)

# Globe render: used as-is, the composition already matches the bridge panel.
Copy-Item -Path $world -Destination (Join-Path $imgDir 'globe.png') -Force
Write-Host ('  globe.png ' + [ImgTool]::Size((Join-Path $imgDir 'globe.png')))

# Social card: the full lockup, including the tagline, on brand navy.
[ImgTool]::Card($logo, (Join-Path $imgDir 'og.png'), 240, 176, 1372, 521, 1200, 630, $bgR, $bgG, $bgB, 0.74)

Write-Host 'Composing app icons...' -ForegroundColor Cyan

$mark = Join-Path $brandDir 'dot-mark.png'
# Next.js App Router picks these up automatically from src/app.
[ImgTool]::Icon($mark, (Join-Path $appDir 'icon.png'), 512, $bgR, $bgG, $bgB, 0.66, 96)
[ImgTool]::Icon($mark, (Join-Path $appDir 'apple-icon.png'), 180, $bgR, $bgG, $bgB, 0.66, 0)

Write-Host 'Done.' -ForegroundColor Green
