-- Initialize Eventify MySQL Database Schema

-- Drop the database if it exists and create a new one
DROP DATABASE IF EXISTS projectweb;
CREATE DATABASE projectweb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE projectweb;

-- Create Users table
CREATE TABLE IF NOT EXISTS `Users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `firstName` VARCHAR(255),
  `lastName` VARCHAR(255),
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Events table
CREATE TABLE IF NOT EXISTS `Events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `location` VARCHAR(255),
  `startDate` DATETIME NOT NULL,
  `endDate` DATETIME,
  `category` VARCHAR(50),
  `userId` INT NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Attendees table
CREATE TABLE IF NOT EXISTS `Attendees` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `status` ENUM('invited', 'confirmed', 'declined', 'maybe') DEFAULT 'invited',
  `eventId` INT NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`eventId`) REFERENCES `Events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add some test data
INSERT INTO `Users` (`firstName`, `lastName`, `username`, `email`, `password`)
VALUES 
('Admin', 'User', 'admin', 'admin@eventify.al', '$2a$10$aMeQ.aHvn/xLXvvLOF8qteJL7xNNxeh0XgKzIlBxHPsMJpK3LBhPS'), -- password: admin123
('Demo', 'User', 'demo', 'demo@eventify.al', '$2a$10$aMeQ.aHvn/xLXvvLOF8qteJL7xNNxeh0XgKzIlBxHPsMJpK3LBhPS'); -- password: admin123 