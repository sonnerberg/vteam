-- Procedure get_all_parkings()

DROP PROCEDURE IF EXISTS get_all_parkings;

DELIMITER ;;

CREATE PROCEDURE get_all_parkings()
 BEGIN

    SELECT * from parking;

  END
;;

DELIMITER ;

-- Procedure get_all_parkings_by_id()

DROP PROCEDURE IF EXISTS get_all_parkings_by_id;

DELIMITER ;;

CREATE PROCEDURE get_all_parkings_by_id(
                    `an_id` INTEGER
)
 BEGIN

   SELECT *
     FROM parking
    WHERE id = an_id;


  END
;;

DELIMITER ;

DELIMITER ;;

CREATE PROCEDURE insert_parking(
                    `some_coordinates` VARCHAR(1024)
                )
 BEGIN

    INSERT INTO parking (geometry) VALUES (PolygonFromText(CONCAT('POLYGON((', some_coordinates, '))')));


  END
;;

DELIMITER ;

DELIMITER ;;

CREATE PROCEDURE update_parking(
                    `an_id` INTEGER,
                    `some_coordinates` VARCHAR(1024)
)
 BEGIN

    UPDATE parking SET geometry = PolygonFromText(CONCAT('POLYGON((', some_coordinates, '))')) WHERE id = an_id;


  END
;;

DELIMITER ;

-- Procedure delete_parking_by_id()

DROP PROCEDURE IF EXISTS delete_parking_by_id;

DELIMITER ;;

CREATE PROCEDURE delete_parking_by_id(
                    `an_id` INTEGER
)
 BEGIN

   DELETE
     FROM parking
    WHERE id = an_id;


  END
;;

DELIMITER ;
