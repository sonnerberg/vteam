DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `scooter`;
DROP TABLE IF EXISTS `zones`;
DROP TABLE IF EXISTS `cities`;
DROP TABLE IF EXISTS `parking`;
DROP TABLE IF EXISTS `geojson`;
DROP TABLE IF EXISTS `bikes`;
DROP TABLE IF EXISTS `customer2bike`;
DROP TABLE IF EXISTS `admin`;
DROP TABLE IF EXISTS `trips`;


CREATE TABLE IF NOT EXISTS `customer` (
`surname` VARCHAR(50),
`lastname` VARCHAR(50),
`adress` VARCHAR(50),
`billing_adress` VARCHAR(50),
`username` VARCHAR(50),
`password` VARCHAR(250),
`email` VARCHAR(50) UNIQUE,
`balance` INT,
`status` ENUM('online', 'offline'),
PRIMARY KEY (`username`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

CREATE TABLE IF NOT EXISTS `zones` (
`id` INT AUTO_INCREMENT,
`position` POLYGON,
`type` ENUM('speed', 'forbidden'),
`speed_limit` INT,
`feature_type` VARCHAR(50) DEFAULT 'zones',
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

CREATE TABLE IF NOT EXISTS `cities` (
`id` INT AUTO_INCREMENT,
`geometry` POLYGON,
`type` VARCHAR(50) DEFAULT 'Feature',
`feature_type` VARCHAR(50) DEFAULT 'cities',
`name` VARCHAR(50),
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

CREATE TABLE IF NOT EXISTS `parking` (
`id` INT AUTO_INCREMENT,
`geometry` POLYGON,
`type` VARCHAR(50) DEFAULT 'Feature',
`feature_type` VARCHAR(50) DEFAULT 'parking-lots',
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

CREATE TABLE IF NOT EXISTS `geojson` (
`id` INT AUTO_INCREMENT,
`position` JSON,
`type` VARCHAR(50),
`speed_limit` INT,
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

CREATE TABLE IF NOT EXISTS `bikes` (
`id` INT AUTO_INCREMENT,
`geometry` POINT,
`whole` BOOLEAN DEFAULT 1,
`charging` BOOLEAN DEFAULT 0,
`blocked` BOOLEAN DEFAULT 0,
`battery_warning` BOOLEAN DEFAULT 0,
`battery_depleted` BOOLEAN DEFAULT 0,
`rented` BOOLEAN DEFAULT 0,
`username` VARCHAR(50),
FOREIGN KEY(`username`) REFERENCES customer(`username`),
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;


CREATE TABLE IF NOT EXISTS `customer2bike` (
    `customer_username` VARCHAR(50) UNIQUE,
    `bike_id` INT UNIQUE,

    FOREIGN KEY(`customer_username`) REFERENCES `customer` (`username`),
    FOREIGN KEY(`bike_id`) REFERENCES `bikes`(`id`),

    PRIMARY key (`customer_username`, `bike_id`)
)
    ENGINE = InnoDB
    CHARSET utf8
    COLLATE utf8_swedish_ci
    ;

CREATE TABLE IF NOT EXISTS `admin` (
`password` VARCHAR(255),
`email` VARCHAR(100),
`super` BOOLEAN,
PRIMARY KEY (`email`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

CREATE TABLE IF NOT EXISTS `trips` (
`id` INT AUTO_INCREMENT,
`startposition` POINT,
`endposition` POINT,
`starttime` DATETIME,
`endtime` DATETIME,
`username` VARCHAR(50),
`cost` FLOAT,
FOREIGN KEY(`username`) REFERENCES `customer`(`username`),
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

--
-- Insert some customers.
--
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/init_data/users.csv'
INTO TABLE customer
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(surname, lastname, adress, billing_adress, username, password, email, balance, status)
;

--
-- Insert some scooters.
--
/* LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/init_data/scooters.csv' */
/* INTO TABLE scooter */
/* CHARSET utf8 */
/* FIELDS */
/*     TERMINATED BY ',' */
/*     ENCLOSED BY '"' */
/* LINES */
/*     TERMINATED BY '\n' */
/* IGNORE 1 LINES */
/* (@col1, @col2, @col3, @col4, @col5) */
/* SET */
/* `position` = PointFromText(@col1), */
/* `status` = @col2, */
/* `health` = @col3, */
/* `rented` = @col4, */
/* `speed` = @col5 */
/* ; */

--
-- Insert some zones.
--
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/init_data/zones.csv'
INTO TABLE zones
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(@col1, @col2, @col3)
SET
`position` = PolygonFromText(@col1),
`type` = @col2,
`speed_limit` = @col3
;

--
-- Insert some cities.
--
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/init_data/cities.csv'
INTO TABLE cities
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(@col1, @col2)
SET
`geometry` = PolygonFromText(@col1),
`name` = @col2
;

--
-- Insert some parking-zones.
--
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/init_data/parking.csv'
INTO TABLE parking
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(@col1, @col2)
SET
`geometry` = PolygonFromText(@col1)
;

--
-- Insert some geodata.
--
INSERT INTO geojson (position, type, speed_limit) VALUES
    ('{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[59.374,16.5025],[59.3731,16.5051],[59.3722,16.5038],[59.3727,16.5008],[59.374,16.5025]]]},"properties":{"prop0":"value0","prop1":{"this":"that"}}}', "limited speed", 15);
