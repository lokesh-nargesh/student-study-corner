-- Create Database
CREATE DATABASE IF NOT EXISTS study_material_db;
USE study_material_db;

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME,
    updated_at DATETIME,
    deleted BOOLEAN DEFAULT FALSE
);

-- Branches Table
CREATE TABLE IF NOT EXISTS branches (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    course_id BIGINT,
    created_at DATETIME,
    updated_at DATETIME,
    deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    college_id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    course_id BIGINT,
    branch_id BIGINT,
    created_at DATETIME,
    updated_at DATETIME,
    deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- Study Materials Table
CREATE TABLE IF NOT EXISTS study_materials (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    material_type VARCHAR(50) NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    user_id BIGINT NOT NULL,
    approval_status VARCHAR(50) DEFAULT 'PENDING',
    upload_date DATETIME,
    download_count INT DEFAULT 0,
    created_at DATETIME,
    updated_at DATETIME,
    deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
