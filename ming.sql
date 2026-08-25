-- Ming.exe database schema: MariaDB 10.4+ / MySQL 8+.
CREATE DATABASE IF NOT EXISTS ming_exe CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ming_exe;

CREATE TABLE IF NOT EXISTS profile (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  age TINYINT UNSIGNED NOT NULL,
  status VARCHAR(40) NOT NULL,
  mood VARCHAR(40) NOT NULL,
  pronouns VARCHAR(255) NOT NULL,
  identity_label VARCHAR(120) NOT NULL,
  sexuality VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS preferences (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type ENUM('like','dislike') NOT NULL,
  name VARCHAR(120) NOT NULL,
  icon VARCHAR(32) DEFAULT '✦',
  rating TINYINT UNSIGNED NOT NULL,
  note TEXT,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lore_entries (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  entry_date VARCHAR(80) NOT NULL,
  body TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  image_path VARCHAR(255) NOT NULL,
  alt_text VARCHAR(255) DEFAULT 'Ming gallery image',
  caption TEXT,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(80) PRIMARY KEY,
  setting_value TEXT NOT NULL,
  value_type ENUM('string', 'number', 'boolean', 'json') NOT NULL DEFAULT 'string',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO settings (setting_key, setting_value, value_type) VALUES
  ('glitch_intensity', '75', 'number'),
  ('background_speed', '60', 'number'),
  ('particles_enabled', 'true', 'boolean'),
  ('scanlines_enabled', 'true', 'boolean'),
  ('reduce_motion', 'false', 'boolean')
ON DUPLICATE KEY UPDATE
  setting_key = VALUES(setting_key);
