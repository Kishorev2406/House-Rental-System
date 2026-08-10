# House Rental System — Database Setup Guide

## Step 1: Install XAMPP
Download and install XAMPP from: https://www.apachefriends.org/
- It includes Apache (web server), PHP, and MySQL

## Step 2: Copy Project Files
Copy the entire "House Rental System" folder to:
```
C:\xampp\htdocs\house-rental\
```

## Step 3: Import Database
1. Open XAMPP Control Panel
2. Start Apache and MySQL
3. Open browser → go to: http://localhost/phpmyadmin
4. Click "New" → Create database named: house_rental_db
5. Click "Import" → Select the file: database.sql
6. Click "Go"

## Step 4: Configure Database
Open this file:
```
api/config.php
```
Change these if needed:
```php
define('DB_USER', 'root');   // your MySQL username
define('DB_PASS', '');       // your MySQL password (blank for XAMPP default)
```

## Step 5: Open Website
Open browser and go to:
```
http://localhost/house-rental/index.html
```

## API Endpoints

| File              | Purpose              |
|-------------------|----------------------|
| api/users.php     | User register/login  |
| api/owners.php    | Owner register/login |
| api/properties.php| Property CRUD        |
| api/bookings.php  | Booking management   |
| api/payments.php  | Payment records      |
| api/admin.php     | Admin login + stats  |

## Admin Login
- Username: 117
- Password: 2406

## Default Test
After setup, register as:
1. Owner → owner-register.html
2. User  → user-register.html
3. Admin → login.html → Admin tab
