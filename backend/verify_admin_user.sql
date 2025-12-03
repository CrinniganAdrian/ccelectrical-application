-- Verify admin user setup
USE testdb;

-- Check if user exists
SELECT * FROM users WHERE username = 'admin';

-- Check user roles
SELECT 
    u.id, 
    u.username, 
    u.email,
    u.password,
    r.name as role
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id
WHERE u.username = 'admin';

