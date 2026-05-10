# School Management API

A simple REST API for managing schools and listing them based on proximity to a user’s location. This project allows users to add schools with geographical coordinates and retrieve schools sorted by distance using the Haversine formula. The backend is built with Node.js, Express.js, and MySQL/TiDB, and is designed to be deployed on cloud platforms like Render.

---

# Tech Stack

* Node.js
* Express.js
* MySQL / TiDB
* Hosted on Render

---

# Features

* Add schools with:

  * Name
  * Address
  * Latitude
  * Longitude

* Validate all incoming inputs

* List schools sorted by nearest distance from the user

* Handles edge cases and invalid requests

* Includes Postman collection covering:

  * Valid requests
  * Invalid inputs
  * Edge cases

---

# Project Structure

```bash
project-root/
│
├── controllers/
│   └── schoolController.js
│
├── routes/
│   └── schoolMgtRoutes.js
│
├── utils/
│   └── findDistance.js
│
├── setup/
│   └── schema.sql
│
├── database.js
├── server.js
├── .env.example
├── package.json
└── README.md
```

---

# Local Setup

## 1. Clone the Repository

```bash
git clone https://github.com/stutiwhy/educase-school-management
cd educase-school-management
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create Environment File

Copy `.env.example` into `.env`

```bash
cp .env.example .env
```

Example `.env`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=edc_school_management
```

---

## 4. Run Database Schema

Run the SQL script inside your MySQL/TiDB instance:

```sql
CREATE DATABASE IF NOT EXISTS edc_school_management;

USE edc_school_management;

CREATE TABLE Schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

INSERT INTO Schools (name, address, latitude, longitude)
VALUES 
('DSRV', 'Saibaba Nagar, Borivali West, Maharashtra', 19.217391, 72.848778),
('SVIS', 'Kandivali West, Maharashtra', 19.209735, 72.847327);
```

---

## 5. Start the Server

```bash
npm start
```

Server runs on:

```bash
http://localhost:3000
```

---

# Live API Base URL

[on render](https://educase-school-management-fb1d.onrender.com)

---

# API Endpoints

| Method | Endpoint       | Parameters                                 | Description                              |
| ------ | -------------- | ------------------------------------------ | ---------------------------------------- |
| POST   | `/addSchool`   | `name`, `address`, `latitude`, `longitude` | Adds a new school                        |
| GET    | `/listSchools` | `latitude`, `longitude` (query params)     | Lists schools sorted by nearest distance |

---

# Endpoint Details

## 1. Add School

### POST `/addSchool`

### Request Body

```json
{
  "name": "ABC School",
  "address": "Mumbai, Maharashtra",
  "latitude": 19.0760,
  "longitude": 72.8777
}
```

### Success Response

```json
{
  "success": true,
  "message": "school added successfully!",
  "data": {
    "id": 1,
    "name": "ABC School",
    "address": "Mumbai, Maharashtra",
    "latitude": 19.076,
    "longitude": 72.8777
  }
}
```

### Validation Errors

```json
{
  "success": false,
  "errors": [
    "latitude must be a number between -90 and 90."
  ]
}
```

---

## 2. List Schools

### GET `/listSchools`

### Example Request

```bash
/listSchools?latitude=19.0760&longitude=72.8777
```

### Success Response

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "DSRV",
      "address": "Saibaba Nagar, Borivali West, Maharashtra",
      "latitude": 19.217391,
      "longitude": 72.848778,
      "distance_km": 15.234
    }
  ]
}
```

---

# Distance Calculation

This project uses the **Haversine Formula** to calculate the great-circle distance between two geographical coordinates on Earth.

The utility is implemented in:

```bash
/utils/findDistance.js
```

---

# Postman Collection

Public Postman collection link:

[json file of collection on drive](https://drive.google.com/file/d/1d_S90oiAUKp1kkL7nnMPqBwE_4b5dPgr/view?usp=sharing&utm_source=chatgpt.com)

### Notes

* The collection contains **2 environments**:

  * Local Environment
  * Production Environment

* Each environment is configured to test:

  * Local server URLs
  * Production Render deployment URLs

* Set the environment variable `baseUrl` before testing.

Example:

```env
Variable: baseUrl
Value: http://localhost:3000
```

For production:

```env
Variable: baseUrl
Value: https://educase-school-management-fb1d.onrender.com
```

### The collection includes testing for:

* Successful requests
* Invalid latitude/longitude cases
* Missing fields
* Empty strings
* Sorting verification
* Edge case testing

---

# Database Schema

```sql
CREATE TABLE Schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

---

# Deployment

This project can be deployed easily on:

* Render
* Railway
* Vercel (backend via serverless functions)
* Heroku

---

# author

stuti mishra
