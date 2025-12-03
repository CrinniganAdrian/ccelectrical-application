# PowerShell script to switch between Development and Production API URLs
# Usage: .\switch-api-urls.ps1 -mode [development|production]

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet('development', 'production')]
    [string]$mode
)

$devURL = "http://localhost:8080"
$prodURL = "http://ccelectricalservices.eu-west-1.elasticbeanstalk.com"

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

Write-Host "Switching API URLs to $mode mode..." -ForegroundColor Yellow
Write-Host ""

$updatedCount = 0
$errorCount = 0

foreach ($file in $files) {
    if (Test-Path $file) {
        try {
            $content = Get-Content $file -Raw
            
            if ($mode -eq "production") {
                # Switch to Production
                # Uncomment production URLs
                $content = $content -replace "//const (.+?) = `"$prodURL", "const `$1 = `"$prodURL"
                $content = $content -replace "//await (.+?)\(`"$prodURL", "await `$1(`"$prodURL"
                $content = $content -replace "//const result = await (.+?)\(`"$prodURL", "const result = await `$1(`"$prodURL"
                $content = $content -replace "//const response = await (.+?)\('$prodURL", "const response = await `$1('$prodURL"
                $content = $content -replace "//baseURL: '$prodURL", "baseURL: '$prodURL"
                
                # Comment out development URLs
                $content = $content -replace "^(\s*)const (.+?) = `"$devURL", "`$1//const `$2 = `"$devURL" -replace "`r`n", "`n"
                $content = $content -replace "^(\s*)await (.+?)\(`"$devURL", "`$1//await `$2(`"$devURL" -replace "`r`n", "`n"
                $content = $content -replace "^(\s*)const result = await (.+?)\(`"$devURL", "`$1//const result = await `$2(`"$devURL" -replace "`r`n", "`n"
                $content = $content -replace "^(\s*)const response = await (.+?)\('$devURL", "`$1//const response = await `$2('$devURL" -replace "`r`n", "`n"
                $content = $content -replace "(\s*)baseURL: '$devURL", "`$1//baseURL: '$devURL"
                
            } else {
                # Switch to Development
                # Uncomment development URLs
                $content = $content -replace "//const (.+?) = `"$devURL", "const `$1 = `"$devURL"
                $content = $content -replace "//await (.+?)\(`"$devURL", "await `$1(`"$devURL"
                $content = $content -replace "//const result = await (.+?)\(`"$devURL", "const result = await `$1(`"$devURL"
                $content = $content -replace "//const response = await (.+?)\('$devURL", "const response = await `$1('$devURL"
                $content = $content -replace "//baseURL: '$devURL", "baseURL: '$devURL"
                
                # Comment out production URLs
                $content = $content -replace "^(\s*)const (.+?) = `"$prodURL", "`$1//const `$2 = `"$prodURL" -replace "`r`n", "`n"
                $content = $content -replace "^(\s*)await (.+?)\(`"$prodURL", "`$1//await `$2(`"$prodURL" -replace "`r`n", "`n"
                $content = $content -replace "^(\s*)const result = await (.+?)\(`"$prodURL", "`$1//const result = await `$2(`"$prodURL" -replace "`r`n", "`n"
                $content = $content -replace "^(\s*)const response = await (.+?)\('$prodURL", "`$1//const response = await `$2('$prodURL" -replace "`r`n", "`n"
                $content = $content -replace "(\s*)baseURL: '$prodURL", "`$1//baseURL: '$prodURL"
            }
            
            $content | Set-Content $file -NoNewline
            Write-Host "✓ Updated: $file" -ForegroundColor Green
            $updatedCount++
        } catch {
            Write-Host "✗ Error updating: $file" -ForegroundColor Red
            Write-Host "  $($_.Exception.Message)" -ForegroundColor Red
            $errorCount++
        }
    } else {
        Write-Host "✗ File not found: $file" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Updated: $updatedCount files" -ForegroundColor Green
if ($errorCount -gt 0) {
    Write-Host "  Errors: $errorCount files" -ForegroundColor Red
}
Write-Host ""
Write-Host "Mode: $mode" -ForegroundColor Yellow
if ($mode -eq "production") {
    Write-Host "Active URL: $prodURL" -ForegroundColor Yellow
} else {
    Write-Host "Active URL: $devURL" -ForegroundColor Yellow
}
Write-Host ""
Write-Host "Remember to restart your React app for changes to take effect!" -ForegroundColor Cyan

