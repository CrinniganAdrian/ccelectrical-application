# User-Specific Favorites Fix

## Problem
Favorites were being shared between all users because they were stored in `localStorage` with generic keys (`favItems`, `favProjects`, `favServices`) that weren't user-specific. This meant that when user "adrianc" added favorites and then user "maurac" logged in, they would see adrianc's favorites.

## Solution
Made favorites user-specific by:

### 1. Updated GlobalState.js
- Added helper functions to create user-specific localStorage keys
- Keys are now in the format: `favItems_user_123`, `favProjects_user_456`, etc.
- Each user's favorites are stored separately based on their user ID

### 2. Updated AppReducer.js
- Added `CLEAR_ALL_FAVORITES` action to reset all favorites
- This ensures clean state when needed

### 3. Updated auth.service.js
- Modified `logout()` function to clear user-specific favorites from localStorage
- Prevents leftover data when users log out

### 4. Updated profile.component.js
- Hidden "My Favourites" button for admin users
- Only users with non-admin roles will see the favorites option

## Changes Made

### frontend/src/context/GlobalState.js
- Added `getCurrentUserId()` helper function
- Added `getUserKey()` helper function
- Updated `initialState` to use user-specific keys
- Updated `useEffect` to save with user-specific keys
- Added `clearAllFavorites()` function

### frontend/src/context/AppReducer.js
- Added `CLEAR_ALL_FAVORITES` case to reset all favorites

### frontend/src/services/auth.service.js
- Updated `logout()` to remove user-specific favorites from localStorage

### frontend/src/components/profile.component.js
- Conditionally render "My Favourites" button only for non-admin users

## Testing Instructions

1. **Test User-Specific Favorites:**
   - Log in as user "adrianc"
   - Add some items/projects/services to favorites
   - Log out
   - Log in as user "maurac"
   - Verify that no favorites are shown (clean slate)
   - Add different favorites as "maurac"
   - Log out and log back in as "adrianc"
   - Verify that adrianc's original favorites are still there

2. **Test Admin User:**
   - Log in as an admin user
   - Go to profile page
   - Verify that "My Favourites" button is not displayed

3. **Test Logout Cleanup:**
   - Log in as any user
   - Add some favorites
   - Log out
   - Check browser localStorage (F12 > Application > Local Storage)
   - Verify that user-specific favorite keys are removed after logout

## Technical Details

### localStorage Key Format
- Before: `favItems`, `favProjects`, `favServices`
- After: `favItems_user_{userId}`, `favProjects_user_{userId}`, `favServices_user_{userId}`

### Example
If user has ID 123:
- Items: `favItems_user_123`
- Projects: `favProjects_user_123`
- Services: `favServices_user_123`

## Migration Notes

**Important:** Existing favorites stored with old keys will not be automatically migrated. Users will need to re-add their favorites after this update. If you need to preserve existing favorites, you would need to:
1. Export current favorites before deploying
2. Map them to specific users
3. Import them with new user-specific keys

Alternatively, users can simply re-add their favorites as needed.

