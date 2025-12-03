-- SQL Script to clear users and create an admin user
-- Database: testdb
-- Run this in MySQL Workbench or your preferred MySQL client

USE testdb;

-- Temporarily disable safe update mode for this script
SET SQL_SAFE_UPDATES = 0;

-- Step 1: Clear existing user relationships (foreign key constraints)
DELETE FROM user_items WHERE 1=1;
DELETE FROM user_services WHERE 1=1;
DELETE FROM user_projects WHERE 1=1;
DELETE FROM user_roles WHERE 1=1;

-- Step 2: Delete all users
DELETE FROM users WHERE 1=1;

-- Step 3: Ensure roles exist
-- First, check if roles table has the required roles
INSERT IGNORE INTO roles (id, name) VALUES (1, 'ROLE_USER');
INSERT IGNORE INTO roles (id, name) VALUES (2, 'ROLE_MODERATOR');
INSERT IGNORE INTO roles (id, name) VALUES (3, 'ROLE_ADMIN');

-- Step 4: Create admin user
-- Password is BCrypt hash for "admin123"
-- BCrypt hash: $2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6
INSERT INTO users (id, username, email, password) 
VALUES (1, 'admin', 'admin@ccelectrical.com', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6');

-- Step 5: Assign ROLE_ADMIN to the admin user
INSERT INTO user_roles (user_id, role_id) VALUES (1, 3);

-- Step 6: Verify the setup
SELECT 
    u.id, 
    u.username, 
    u.email, 
    r.name as role
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id;

-- Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;

