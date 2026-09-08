CREATE DATABASE react_learning_db 
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE react_learning_db;

CREATE TABLE users_sessions (
    user_id INT PRIMARY KEY,
    session_token VARCHAR(200) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expired_at DATETIME
);