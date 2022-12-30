-- Procedure get_all_zones()

DROP PROCEDURE IF EXISTS get_all_zones;

DELIMITER ;;

CREATE PROCEDURE get_all_zones()
 BEGIN

    SELECT * from zones;

  END
;;

DELIMITER ;

-- Procedure get_all_zones_by_id()

DROP PROCEDURE IF EXISTS get_all_zones_by_id;

DELIMITER ;;

CREATE PROCEDURE get_all_zones_by_id(
                    `an_id` INTEGER
)
 BEGIN

   SELECT *
     FROM zones
    WHERE id = an_id;


  END
;;

DELIMITER ;

DELIMITER ;;

CREATE PROCEDURE insert_zone(
                    `some_coordinates` VARCHAR(1024),
                    `a_type` ENUM('speed', 'forbidden'),
                    `a_speed_limit` INT
                )
 BEGIN

    INSERT INTO zones (geometry, `type`, speed_limit) VALUES (PolygonFromText(CONCAT('POLYGON((', some_coordinates, '))')), `a_type`, a_speed_limit);


  END
;;

DELIMITER ;

DELIMITER ;;

CREATE PROCEDURE update_zone(
                    `an_id` INTEGER,
                    `some_coordinates` VARCHAR(1024),
                    `a_type` ENUM('speed', 'forbidden'),
                    `a_speed_limit` INT
)
 BEGIN

    UPDATE zones SET geometry = PolygonFromText(CONCAT('POLYGON((', some_coordinates, '))')), type = a_type, speed_limit = a_speed_limit WHERE id = an_id;


  END
;;

DELIMITER ;

-- Procedure delete_zone_by_id()

DROP PROCEDURE IF EXISTS delete_zone_by_id;

DELIMITER ;;

CREATE PROCEDURE delete_zone_by_id(
                    `an_id` INTEGER
)
 BEGIN

   DELETE
     FROM zones
    WHERE id = an_id;


  END
;;

DELIMITER ;
