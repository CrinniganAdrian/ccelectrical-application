package com.ccelectrical.springjwt.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Utility to generate BCrypt password hash for testing
 * Run this to generate a hash that will work with your Spring Security config
 */
public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "admin123";
        String encodedPassword = encoder.encode(rawPassword);
        
        System.out.println("==================================");
        System.out.println("Password Hash Generator");
        System.out.println("==================================");
        System.out.println("Raw Password: " + rawPassword);
        System.out.println("Encoded Hash: " + encodedPassword);
        System.out.println("==================================");
        System.out.println("\nSQL Update Command:");
        System.out.println("UPDATE users SET password = '" + encodedPassword + "' WHERE username = 'admin';");
    }
}

