# PowerShell script to create admin user via API
# Make sure your Spring Boot backend is running first!

$uri = "http://localhost:8080/api/auth/signup"
$body = @{
    username = "admin"
    email = "admin@ccelectrical.com"
    password = "admin123"
    role = @("admin")
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

Write-Host "Creating admin user..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri $uri -Method Post -Body $body -Headers $headers
    Write-Host "Success: $($response.message)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Login credentials:" -ForegroundColor Cyan
    Write-Host "  Username: admin" -ForegroundColor White
    Write-Host "  Password: admin123" -ForegroundColor White
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Response: $($_.ErrorDetails.Message)" -ForegroundColor Red
}

