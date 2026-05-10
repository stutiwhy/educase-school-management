-- /setup/schema.db

-- id (Primary Key)
-- name (VARCHAR)
-- address (VARCHAR)
-- latitude (FLOAT)
-- longitude (FLOAT)

--  run this script on local machine/ cloud instance

CREATE DATABASE IF NOT EXISTS edc_school_management;

use edc_school_management;

CREATE TABLE Schools (
    -- no fields are allowed to be null
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

-- example data 
INSERT INTO Schools (name, address, latitude, longitude)
VALUES 
('DSRV', 'Saibaba Nagar, Borivali West, Maharashtra', 19.217391, 72.848778),
('SVIS', 'Kandivali West, Maharashtra', 19.209735, 72.847327);