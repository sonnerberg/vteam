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

-- Procedure set_scooter_returned()

DROP PROCEDURE IF EXISTS set_scooter_returned;

DELIMITER ;;

CREATE PROCEDURE set_scooter_returned(
    `a_username` VARCHAR(50)
    )

 BEGIN

    DELETE FROM customer2bike WHERE customer_username = `a_username`;

  END
;;

DELIMITER ;
-- Procedure set_scooter_rented()

DROP PROCEDURE IF EXISTS set_scooter_rented;

DELIMITER ;;

CREATE PROCEDURE set_scooter_rented(
    `a_username` VARCHAR(50),
    `a_scooter_id` INTEGER
    )

 BEGIN

    INSERT INTO customer2bike SET customer_username = `a_username`, bike_id = `a_scooter_id`;

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

DROP TRIGGER IF EXISTS set_returned;

DELIMITER ;;
CREATE TRIGGER set_returned
AFTER DELETE ON customer2bike
FOR EACH ROW
BEGIN
    UPDATE bikes SET rented = false, username = null WHERE id = OLD.bike_id;
END;
;;

DELIMITER ;
DROP TRIGGER IF EXISTS set_rented;

DELIMITER ;;
CREATE TRIGGER set_rented
AFTER INSERT ON customer2bike
FOR EACH ROW
BEGIN
    UPDATE bikes SET rented = true, username = NEW.customer_username WHERE id = NEW.bike_id;
END;
;;

DELIMITER ;

DELIMITER ;;

CREATE PROCEDURE insert_multiple_bikes(number_of_bikes INT)
  BEGIN
    SET @x = 0;
    REPEAT
      SET @x = @x + 1;
      INSERT INTO bikes VALUES ();
    UNTIL @x >= number_of_bikes
    END REPEAT;
  END
;;

DELIMITER ;
