# API URL Configuration Guide

## Current Setup
All API URLs have been configured with both **Development** and **Production** options.

### Development (Current - Active)
- URL: `http://localhost:8080`

### Production (Commented Out)
- URL: `http://ccelectricalservices.eu-west-1.elasticbeanstalk.com`

---

## Files Updated (17 Total)

### Service Layer Files
1. ✅ `src/services/auth.service.js`
   - API_URL (auth endpoints)
   - USER_API_URL (user endpoints)

2. ✅ `src/services/user.service.js`
   - API_URL (test endpoints)

### Configuration Files
3. ✅ `src/pages/axios.js`
   - baseURL (global axios config)

### API Service Files
4. ✅ `src/pages/ItemService.js`
   - ITEM_API_BASE_URL

5. ✅ `src/pages/ProjectService.js`
   - PROJECT_API_BASE_URL

6. ✅ `src/pages/ServiceService.js`
   - PROJECT_API_BASE_URL (services)

### Fetch Components
7. ✅ `src/components/FetchItems.js`
   - ITEM_API_BASE_URL

8. ✅ `src/components/FetchProjects.js`
   - ITEM_API_BASE_URL

9. ✅ `src/components/FetchServices.js`
   - ITEM_API_BASE_URL

### CRUD Components - Items
10. ✅ `src/items/AddItem.js`
    - POST endpoint

11. ✅ `src/items/EditItem.js`
    - PUT endpoint
    - GET endpoint

### CRUD Components - Projects
12. ✅ `src/projects/AddProject.js`
    - POST endpoint

13. ✅ `src/projects/EditProject.js`
    - PUT endpoint
    - GET endpoint

### CRUD Components - Services
14. ✅ `src/servicesCRUD/AddService.js`
    - POST endpoint

15. ✅ `src/servicesCRUD/EditService.js`
    - PUT endpoint
    - GET endpoint

### Page Components
16. ✅ `src/pages/Add.js`
    - fetch endpoint

---

## Format Used in All Files

```javascript
// Production URL (AWS Elastic Beanstalk)
//const API_URL = "http://ccelectricalservices.eu-west-1.elasticbeanstalk.com/api/auth/";
// Local Development URL
const API_URL = "http://localhost:8080/api/auth/";
```

---

## Switching Between Development and Production

### Manual Method:
1. Find all instances of the URL patterns above
2. Comment out the current active URL
3. Uncomment the desired URL

### Automated Method:
Use the provided PowerShell script: `switch-api-urls.ps1`

```powershell
# Switch to Production
.\switch-api-urls.ps1 -mode production

# Switch to Development
.\switch-api-urls.ps1 -mode development
```

---

## Testing Checklist

Before deploying to production:
- [ ] All tests pass
- [ ] Switch URLs to production
- [ ] Test authentication
- [ ] Test CRUD operations (Items, Projects, Services)
- [ ] Verify all API calls work
- [ ] Push to GitHub
- [ ] Deploy to Elastic Beanstalk

---

## Admin Credentials (Development)
- **Username:** admin
- **Email:** admin@ccelectrical.com
- **Password:** admin123

---

**Last Updated:** December 3, 2025

