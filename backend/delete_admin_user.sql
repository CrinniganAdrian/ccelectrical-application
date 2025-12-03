-- Delete admin user safely (respecting foreign key constraints)
USE testdb;

-- Temporarily disable safe update mode
SET SQL_SAFE_UPDATES = 0;

-- Delete in correct order (child tables first, then parent)
-- Step 1: Delete from all junction tables that reference users
DELETE FROM user_roles WHERE user_id = 1;
DELETE FROM user_items WHERE user_id = 1;
DELETE FROM user_services WHERE user_id = 1;
DELETE FROM user_projects WHERE user_id = 1;

-- Step 2: Now safe to delete the user
DELETE FROM users WHERE id = 1;

-- Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;

-- Verify deletion
SELECT * FROM users WHERE username = 'admin';

