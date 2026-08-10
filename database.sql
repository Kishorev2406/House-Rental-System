-- ================================================================
-- HOUSE RENTAL MANAGEMENT SYSTEM — DATABASE SCHEMA
-- ================================================================

CREATE DATABASE IF NOT EXISTS house_rental_db;
USE house_rental_db;

-- ----------------------------------------------------------------
-- ADMIN TABLE
-- ----------------------------------------------------------------
CREATE TABLE admin (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  username    VARCHAR(50) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(100),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin (username, password, name, email)
VALUES ('117', '2406', 'System Admin', 'admin@hrs.com');

-- ----------------------------------------------------------------
-- USERS TABLE
-- ----------------------------------------------------------------
CREATE TABLE users (
  id           INT PRIMARY KEY AUTO_INCREMENT,
  name         VARCHAR(100) NOT NULL,
  username     VARCHAR(50) NOT NULL UNIQUE,
  email        VARCHAR(100) NOT NULL UNIQUE,
  password     VARCHAR(255) NOT NULL,
  phone        VARCHAR(15),
  gender       VARCHAR(10),
  dob          DATE,
  district     VARCHAR(100),
  city         VARCHAR(100),
  address      TEXT,
  profile_pic  TEXT,
  status       ENUM('Active','Blocked') DEFAULT 'Active',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------
-- OWNERS TABLE
-- ----------------------------------------------------------------
CREATE TABLE owners (
  id           INT PRIMARY KEY AUTO_INCREMENT,
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(100) NOT NULL UNIQUE,
  password     VARCHAR(255) NOT NULL,
  phone        VARCHAR(15),
  district     VARCHAR(100),
  address      TEXT,
  id_proof     VARCHAR(50),
  approved     TINYINT(1) DEFAULT 0,
  status       ENUM('Active','Suspended') DEFAULT 'Active',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------
-- PROPERTIES TABLE
-- ----------------------------------------------------------------
CREATE TABLE properties (
  id           INT PRIMARY KEY AUTO_INCREMENT,
  owner_id     INT NOT NULL,
  name         VARCHAR(200) NOT NULL,
  type         VARCHAR(50),
  furnished    VARCHAR(50),
  district     VARCHAR(100),
  city         VARCHAR(100),
  address      TEXT,
  pincode      VARCHAR(10),
  rent         DECIMAL(10,2) NOT NULL,
  deposit      DECIMAL(10,2),
  bedrooms     INT DEFAULT 1,
  bathrooms    INT DEFAULT 1,
  parking      TINYINT(1) DEFAULT 0,
  water        TINYINT(1) DEFAULT 1,
  electricity  TINYINT(1) DEFAULT 1,
  internet     TINYINT(1) DEFAULT 0,
  food         VARCHAR(50) DEFAULT 'none',
  description  TEXT,
  image_url    TEXT,
  nearby       TEXT,
  status       ENUM('Available','Rented') DEFAULT 'Available',
  approved     TINYINT(1) DEFAULT 0,
  rating       DECIMAL(3,1) DEFAULT 0,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------
-- BOOKINGS TABLE
-- ----------------------------------------------------------------
CREATE TABLE bookings (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  user_id         INT NOT NULL,
  property_id     INT NOT NULL,
  property_name   VARCHAR(200),
  owner_name      VARCHAR(100),
  booking_date    DATE,
  start_date      DATE,
  duration        INT,
  rent_per_month  DECIMAL(10,2),
  deposit         DECIMAL(10,2),
  total_amount    DECIMAL(10,2),
  message         TEXT,
  owner_status    ENUM('Pending','Approved','Rejected') DEFAULT 'Pending',
  status          ENUM('Pending','Approved','Rejected','Cancelled') DEFAULT 'Pending',
  payment_status  ENUM('Pending','Paid') DEFAULT 'Pending',
  payment_method  VARCHAR(50),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)     REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------
-- PAYMENTS TABLE
-- ----------------------------------------------------------------
CREATE TABLE payments (
  id           VARCHAR(50) PRIMARY KEY,
  booking_id   INT,
  user_id      INT NOT NULL,
  amount       DECIMAL(10,2) NOT NULL,
  method       VARCHAR(50),
  description  TEXT,
  status       ENUM('Success','Failed','Pending') DEFAULT 'Success',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)   REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL
);

-- ----------------------------------------------------------------
-- REVIEWS TABLE
-- ----------------------------------------------------------------
CREATE TABLE reviews (
  id           INT PRIMARY KEY AUTO_INCREMENT,
  user_id      INT NOT NULL,
  property_id  INT NOT NULL,
  rating       INT CHECK (rating BETWEEN 1 AND 5),
  review_text  TEXT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)    REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------
-- NOTIFICATIONS TABLE
-- ----------------------------------------------------------------
CREATE TABLE notifications (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  user_id    INT,
  type       VARCHAR(50),
  title      VARCHAR(200),
  message    TEXT,
  is_read    TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
