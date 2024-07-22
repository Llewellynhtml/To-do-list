-


CREATE DATABASE IF NOT EXISTS todolist_db;


USE todolist_db;


CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  priority ENUM('Low', 'Medium', 'High') NOT NULL
);
