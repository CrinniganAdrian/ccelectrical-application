# PowerShell script to verify API URL configuration
# This checks that all files have both development and production URLs

$devURL = "localhost:8080"
$prodURL = "ccelectricalservices.eu-west-1.elasticbeanstalk.com"

$files = @(
    "src\services\auth.service.js",
    "src\services\user.service.js",
    "src\pages\axios.js",
    "src\pages\ItemService.js",
    "src\pages\ProjectService.js",
    "src\pages\ServiceService.js",
    "src\components\FetchItems.js",
    "src\components\FetchProjects.js",
    "src\components\FetchServices.js",
    "src\items\AddItem.js",
    "src\items\EditItem.js",
    "src\projects\AddProject.js",
    "src\projects\EditProject.js",
    "src\servicesCRUD\AddService.js",
    "src\servicesCRUD\EditService.js",
    "src\pages\Add.js"
)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "API URL Configuration Verification" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$totalFiles = 0
$filesWithBoth = 0
$filesWithIssues = 0
$missingFiles = 0

foreach ($file in $files) {
    if (Test-Path $file) {
        $totalFiles++
        $content = Get-Content $file -Raw
        
        $hasDev = $content -match $devURL
        $hasProd = $content -match $prodURL
        
        if ($hasDev -and $hasProd) {
            Write-Host "[OK] $file" -ForegroundColor Green
            Write-Host "     Has both Development and Production URLs" -ForegroundColor Gray
            $filesWithBoth++
        } elseif ($hasDev -and -not $hasProd) {
            Write-Host "[WARN] $file" -ForegroundColor Yellow
            Write-Host "       Missing Production URL!" -ForegroundColor Yellow
            $filesWithIssues++
        } elseif ($hasProd -and -not $hasDev) {
            Write-Host "[WARN] $file" -ForegroundColor Yellow
            Write-Host "       Missing Development URL!" -ForegroundColor Yellow
            $filesWithIssues++
        } else {
            Write-Host "[ERROR] $file" -ForegroundColor Red
            Write-Host "        Missing both URLs!" -ForegroundColor Red
            $filesWithIssues++
        }
    } else {
        Write-Host "[ERROR] $file" -ForegroundColor Red
        Write-Host "        File not found!" -ForegroundColor Red
        $missingFiles++
    }
    Write-Host ""
}

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Total Files Checked: $totalFiles" -ForegroundColor White
Write-Host "Files with Both URLs: $filesWithBoth" -ForegroundColor Green
if ($filesWithIssues -gt 0) {
    Write-Host "Files with Issues: $filesWithIssues" -ForegroundColor Yellow
}
if ($missingFiles -gt 0) {
    Write-Host "Missing Files: $missingFiles" -ForegroundColor Red
}
Write-Host ""

if ($filesWithBoth -eq $totalFiles -and $missingFiles -eq 0) {
    Write-Host "SUCCESS: All files are properly configured!" -ForegroundColor Green
} else {
    Write-Host "WARNING: Some files need attention!" -ForegroundColor Yellow
}
