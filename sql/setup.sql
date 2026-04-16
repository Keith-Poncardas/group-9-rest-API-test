-- Create Database
CREATE DATABASE IF NOT EXISTS Garcia;
USE Garcia;

-- Create Students Table
CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    course VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Records (at least 3)
INSERT INTO students (firstName, lastName, age, course, email) VALUES
('John', 'Smith', 20, 'Computer Science', 'john.smith@example.com'),
('Maria', 'Garcia', 22, 'Information Technology', 'maria.garcia@example.com'),
('David', 'Johnson', 21, 'Software Engineering', 'david.johnson@example.com'),
('Sarah', 'Williams', 23, 'Data Science', 'sarah.williams@example.com');

-- SQL Queries with WHERE conditions
-- Query 1: Get students older than 21
SELECT * FROM students WHERE age > 21;

-- Query 2: Get students in specific course
SELECT * FROM students WHERE course = 'Computer Science';

-- Query 3: Get student by last name
SELECT * FROM students WHERE lastName = 'Garcia';

-- Query 4: Get students with age between 20 and 22
SELECT * FROM students WHERE age BETWEEN 20 AND 22;