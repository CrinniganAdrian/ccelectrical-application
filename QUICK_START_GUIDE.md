# Quick Start Guide - New Favorites & Contact Features

## 🚀 How to Test the New Features

### Step 1: Start the Application

```bash
# Terminal 1 - Start Backend
cd backend
mvn spring-boot:run

# Terminal 2 - Start Frontend
cd frontend
npm start
```

Application should open at `http://localhost:3000`

---

## 🌟 Feature 1: Combined Favorites Page

### Adding Favorites
1. **Login** as a ROLE_USER account
2. Navigate to **Items**, **Projects**, or **Services** page
3. Click the **star icon** (☆) next to any item
4. Star fills in (⭐) - item is now favorited
5. Click the star again to unfavorite

### Viewing All Favorites
1. Go to your **Profile** page
2. Click the **"My Favourites"** button
3. You'll see the new unified favorites page!

### Using the Filter
1. On the favorites page, look for the dropdown menu
2. Options available:
   - **All Favourites** - See everything organized by category
   - **Items Only** - Filter to show only items
   - **Projects Only** - Filter to show only projects
   - **Services Only** - Filter to show only services
3. Each option shows the count: e.g., "Items Only (3)"

### Removing Favorites
- Click the **X** button on any favorite card
- It's immediately removed from your favorites

---

## 📧 Feature 2: Enhanced Contact Form

### Sending a Message with Favorites

1. **Add some favorites first** (see above)

2. **Navigate to Contact Us page**

3. **See your favorites automatically loaded**
   - They appear in a special section above the message box
   - Organized by category (Items, Projects, Services)
   - Each has an icon and name

4. **Remove specific favorites** (optional)
   - Click the red **X** button next to any favorite
   - This only removes it from THIS message
   - Your actual favorites list is unchanged

5. **Write your custom message**
   - Use the "Your Message" text area
   - Write your inquiry or question

6. **Submit the form**
   - Fill in your name and email
   - Click "Send Message"
   - Wait for success confirmation

### Email Format You'll Send

```
=== MY FAVOURITES ===

ITEMS:
1. LED Light Fixture
2. Circuit Breaker Panel

PROJECTS:
1. Commercial Office Wiring

SERVICES:
1. Electrical Inspection
2. Emergency Repair

=== MY MESSAGE ===

Hi, I'm interested in getting quotes for the items and 
services listed above. Please contact me at your earliest 
convenience.
```

---

## 🎯 Quick Test Scenarios

### Scenario 1: Full Journey Test
1. Login as user
2. Favorite 2 items, 1 project, 2 services
3. Go to Profile → My Favourites
4. View "All Favourites" - should see all 5 organized
5. Switch to "Items Only" - should see 2 items
6. Switch to "Projects Only" - should see 1 project
7. Go to Contact Us
8. See all 5 favorites pre-loaded
9. Remove 1 service from the list
10. Write a message
11. Send and check email

### Scenario 2: Empty States
1. Login with account that has NO favorites
2. Go to Profile → My Favourites
3. Should see: "No favourites yet! Start adding..."
4. Add some favorites
5. Return to favorites page - should now display

### Scenario 3: Filter Testing
1. Add only items (no projects or services)
2. Go to favorites page
3. "All Favourites" should show only Items section
4. "Projects Only" should show "No projects in your favourites yet!"

### Scenario 4: Contact Form Without Favorites
1. Login as user
2. Don't add any favorites
3. Go to Contact Us
4. Favorites section should NOT appear
5. Just see normal contact form
6. Can still send message normally

---

## 💡 Tips & Tricks

### For Users
- **Quick Access**: Bookmark `/allFavorites` for quick access to favorites
- **Contact Prep**: Add favorites before contacting - saves time explaining what you want
- **Filter Shortcuts**: Use filters when you have many favorites
- **Toggle Freely**: You can favorite/unfavorite as many times as you want

### For Testing
- **Clear localStorage**: If you need to reset, open browser console and run:
  ```javascript
  localStorage.clear()
  ```
- **Check Console**: Open browser DevTools (F12) to see any errors
- **Network Tab**: Watch the email sending in the Network tab
- **Test Different Users**: Each user has their own separate favorites

---

## 🐛 Common Issues & Solutions

### Issue: Favorites not showing in contact form
**Solution**: Make sure you're logged in and have added favorites

### Issue: Email not sending
**Solution**: 
- Check browser console for errors
- Verify EmailJS credentials are correct
- Check internet connection

### Issue: Filter not working
**Solution**: 
- Refresh the page
- Check browser console for errors
- Make sure you have favorites in that category

### Issue: Old favorites still showing
**Solution**: 
- The migration script should have cleared old data
- If issues persist, clear localStorage manually

---

## 📱 Mobile Testing

Don't forget to test on mobile!

1. Open Chrome DevTools (F12)
2. Click the device toolbar icon (or Ctrl+Shift+M)
3. Select a mobile device (iPhone, Android)
4. Test all features:
   - Adding favorites
   - Viewing favorites page
   - Using the dropdown filter
   - Filling out contact form

---

## ✅ Success Criteria

You'll know everything is working when:

✅ Star icons toggle on/off when clicked
✅ Favorites page shows all your favorites
✅ Filter dropdown changes what's displayed
✅ Counts in dropdown match actual favorites
✅ Contact form shows favorites automatically
✅ Can remove favorites from contact form
✅ Email sends with proper formatting
✅ No console errors
✅ Works on both desktop and mobile

---

## 🎉 You're All Set!

The new favorites system is:
- ✨ More intuitive
- 🚀 Faster to use
- 💪 More powerful
- 📧 Better integrated with contact

Enjoy the enhanced experience! If you find any issues, check the console and refer to the detailed documentation in `COMBINED_FAVORITES_AND_CONTACT_UPDATE.md`.

