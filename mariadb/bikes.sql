DROP TABLE IF EXISTS `bikes`;

CREATE TABLE IF NOT EXISTS `bikes` (
`id` INT AUTO_INCREMENT,
`geometry` POINT,
`whole` BOOLEAN DEFAULT 1,
`charging` BOOLEAN DEFAULT 0,
`blocked` BOOLEAN DEFAULT 0,
`battery_warning` BOOLEAN DEFAULT 0,
`battery_depleted` BOOLEAN DEFAULT 0,
`rented` BOOLEAN DEFAULT 0,
`user_id` INT,
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;

--
-- Insert some scooters.
--
LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/init_data/bikes.csv'
INTO TABLE bikes
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(@col1)
SET
`geometry` = PointFromText(@col1)
;

-- Procedure update_scooter_charging()

DROP PROCEDURE IF EXISTS update_scooter_charging;

DELIMITER ;;

CREATE PROCEDURE update_scooter_charging(
                    `a_boolean` BOOLEAN,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET charging = a_boolean
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

-- Procedure update_scooter_blocked()

DROP PROCEDURE IF EXISTS update_scooter_blocked;

DELIMITER ;;

CREATE PROCEDURE update_scooter_blocked(
                    `a_boolean` BOOLEAN,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET blocked = a_boolean
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

-- Procedure update_scooter_battery_warning()

DROP PROCEDURE IF EXISTS update_scooter_battery_warning;

DELIMITER ;;

CREATE PROCEDURE update_scooter_battery_warning(
                    `a_boolean` BOOLEAN,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET battery_warning = a_boolean
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

-- Procedure update_scooter_battery_depleted()

DROP PROCEDURE IF EXISTS update_scooter_battery_depleted;

DELIMITER ;;

CREATE PROCEDURE update_scooter_battery_depleted(
                    `a_boolean` BOOLEAN,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET battery_depleted = a_boolean
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

-- Procedure update_scooter_rented()

DROP PROCEDURE IF EXISTS update_scooter_rented;

DELIMITER ;;

CREATE PROCEDURE update_scooter_rented(
                    `a_boolean` BOOLEAN,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET rented = a_boolean
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

-- Procedure update_scooter_user_id()

DROP PROCEDURE IF EXISTS update_scooter_user_id;

DELIMITER ;;

CREATE PROCEDURE update_scooter_user_id(
                    `a_user_id` INTEGER,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET user_id = a_user_id
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

-- Procedure update_scooter_whole()

DROP PROCEDURE IF EXISTS update_scooter_whole;

DELIMITER ;;

CREATE PROCEDURE update_scooter_whole(
                    `a_boolean` BOOLEAN,
                    `a_scooter_id` INTEGER
)
 BEGIN

    UPDATE bikes
    SET whole = a_boolean
    WHERE id = a_scooter_id;


  END
;;

DELIMITER ;

-- Procedure update_scooter_position()

DROP PROCEDURE IF EXISTS update_scooter_position;

DELIMITER ;;

CREATE PROCEDURE update_scooter_position(
                    `scooter_id` INT,
                    `latitude` FLOAT,
                    `longitude` FLOAT
)
 BEGIN
 SET @coords = CONCAT('POINT(', latitude, ' ', longitude, ')');

    UPDATE bikes
    SET geometry = ST_PointFromText(@coords)
    WHERE id = scooter_id;


  END
;;

DELIMITER ;

-- Procedure new_scooter()

DROP PROCEDURE IF EXISTS new_scooter;

DELIMITER ;;

CREATE PROCEDURE new_scooter(
                    `latitude` FLOAT,
                    `longitude` FLOAT
)
 BEGIN
 SET @coords = CONCAT('POINT(', latitude, ' ', longitude, ')');

    INSERT INTO bikes (geometry)
    VALUES (PointFromText(@coords));

    SELECT LAST_INSERT_ID() AS id;


  END
;;

DELIMITER ;

-- Procedure get_scooters_within()

DROP PROCEDURE IF EXISTS get_scooters_within;

DELIMITER ;;

CREATE PROCEDURE get_scooters_within(
    `a_geometry_object` VARCHAR(1024)
)

 BEGIN

    SELECT * FROM bikes WHERE ST_CONTAINS(ST_GeomFromGeoJson(a_geometry_object), geometry);

  END
;;

DELIMITER ;

-- Procedure get_scooter_by_id()

DROP PROCEDURE IF EXISTS get_scooter_by_id;

DELIMITER ;;

CREATE PROCEDURE get_scooter_by_id(
    `a_scooter_id` INTEGER
)

 BEGIN

    SELECT * FROM bikes WHERE id = a_scooter_id;

  END
;;

DELIMITER ;

-- Procedure get_all_scooters()

DROP PROCEDURE IF EXISTS get_all_scooters;

DELIMITER ;;

CREATE PROCEDURE get_all_scooters()

 BEGIN

    SELECT * FROM bikes;

  END
;;

DELIMITER ;
