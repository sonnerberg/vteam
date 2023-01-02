-- Procedure get_all_cities()

DROP PROCEDURE IF EXISTS get_all_cities;

DELIMITER ;;

CREATE PROCEDURE get_all_cities()
 BEGIN

    SELECT * from cities;

  END
;;

DELIMITER ;

-- Procedure get_all_cities_by_name()

DROP PROCEDURE IF EXISTS get_all_cities_by_name;

DELIMITER ;;

CREATE PROCEDURE get_all_cities_by_name(
                    `a_name` VARCHAR(50)
)
 BEGIN

   SELECT *
     FROM cities
    WHERE name = a_name;


  END
;;

DELIMITER ;

DELIMITER ;;

CREATE PROCEDURE insert_city(
                    `a_name` VARCHAR(50),
                    `some_coordinates` VARCHAR(1024)
)
 BEGIN

    INSERT INTO cities (geometry, name) VALUES (PolygonFromText(CONCAT('POLYGON((', some_coordinates, '))')), a_name);


  END
;;

DELIMITER ;

DELIMITER ;;

CREATE PROCEDURE update_city(
                    `a_name` VARCHAR(50),
                    `some_coordinates` VARCHAR(1024)
)
 BEGIN

    UPDATE cities SET geometry = PolygonFromText(CONCAT('POLYGON((', some_coordinates, '))')) WHERE name = a_name;


  END
;;

DELIMITER ;

-- Procedure delete_city_by_name()

DROP PROCEDURE IF EXISTS delete_city_by_name;

DELIMITER ;;

CREATE PROCEDURE delete_city_by_name(
                    `a_name` VARCHAR(50)
)
 BEGIN

   DELETE
     FROM cities
    WHERE name = a_name;


  END
;;

DELIMITER ;
