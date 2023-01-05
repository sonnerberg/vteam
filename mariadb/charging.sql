-- Procedure get_all_chargings()

DROP PROCEDURE IF EXISTS get_all_chargings;

DELIMITER ;;

CREATE PROCEDURE get_all_chargings()
 BEGIN

    SELECT * from charging;

  END
;;

DELIMITER ;

-- Procedure get_all_chargings_by_id()

DROP PROCEDURE IF EXISTS get_all_chargings_by_id;

DELIMITER ;;

CREATE PROCEDURE get_all_chargings_by_id(
                    `an_id` INTEGER
)
 BEGIN

   SELECT *
     FROM charging
    WHERE id = an_id;


  END
;;

DELIMITER ;

DELIMITER ;;

CREATE PROCEDURE insert_charging(
                    `some_coordinates` VARCHAR(1024)
                )
 BEGIN

    INSERT INTO charging (geometry) VALUES (PolygonFromText(CONCAT('POLYGON((', some_coordinates, '))')));


  END
;;

DELIMITER ;

DELIMITER ;;

CREATE PROCEDURE update_charging(
                    `an_id` INTEGER,
                    `some_coordinates` VARCHAR(1024)
)
 BEGIN

    UPDATE charging SET geometry = PolygonFromText(CONCAT('POLYGON((', some_coordinates, '))')) WHERE id = an_id;

  END
;;

DELIMITER ;

-- Procedure delete_charging_by_id()

DROP PROCEDURE IF EXISTS delete_charging_by_id;

DELIMITER ;;

CREATE PROCEDURE delete_charging_by_id(
                    `an_id` INTEGER
)
 BEGIN

   DELETE
     FROM charging
    WHERE id = an_id;


  END
;;

DELIMITER ;
