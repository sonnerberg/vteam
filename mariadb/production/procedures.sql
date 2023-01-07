-- Procedure get_filtered_admin()

DROP PROCEDURE IF EXISTS get_filtered_admin;

DELIMITER ;;

CREATE PROCEDURE get_filtered_admin(
                    `filter` VARCHAR(20)
)
 BEGIN

    SELECT email
        AS 'Email'
      FROM admin
     WHERE admin.email = filter;


  END
;;

DELIMITER ;

-- Procedure get_password_of_admin()

DROP PROCEDURE IF EXISTS get_password_of_admin;

DELIMITER ;;

CREATE PROCEDURE get_password_of_admin(
                    `filter` VARCHAR(100)
)
 BEGIN

    SELECT password
        AS 'password'
      FROM admin
     WHERE admin.email = filter;


  END
;;

DELIMITER ;

-- Procedure check_if_admin_is_super()

DROP PROCEDURE IF EXISTS check_if_admin_is_super;

DELIMITER ;;

CREATE PROCEDURE check_if_admin_is_super(
                        `email` VARCHAR(100)
)
 BEGIN

    SELECT super
      FROM admin
     WHERE admin.email = email;


  END
;;

DELIMITER ;

-- Procedure register_admin()

DROP PROCEDURE IF EXISTS register_admin;

DELIMITER ;;

CREATE PROCEDURE register_admin(
                    `email` VARCHAR(100),
                    `password` VARCHAR(255)
)
 BEGIN

    INSERT INTO admin (email,password)
    VALUES (email, password);


  END
;;

DELIMITER ;

-- Procedure get_all_admins_except_super()

DROP PROCEDURE IF EXISTS get_all_admins_except_super;

DELIMITER ;;

CREATE PROCEDURE get_all_admins_except_super()
 BEGIN

    SELECT email
      FROM admin
     WHERE super IS NOT true;

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

-- Procedure set_scooter_returned_by_id()

DROP PROCEDURE IF EXISTS set_scooter_returned_by_id;

DELIMITER ;;

CREATE PROCEDURE set_scooter_returned_by_id(
    `an_id` INTEGER
    )

 BEGIN

    DELETE FROM customer2bike WHERE bike_id = `an_id`;

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

-- Procedure check_if_scooter_is_rented()

DROP PROCEDURE IF EXISTS check_if_scooter_is_rented;

DELIMITER ;;

CREATE PROCEDURE check_if_scooter_is_rented(
  `an_id` INTEGER
)

 BEGIN

    SELECT rented FROM bikes WHERE id = an_id;

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

-- Procedure scooter_in_forbidden_zone()
  -- TODO: Select less information than *

DROP PROCEDURE IF EXISTS scooter_in_forbidden_zone;

DELIMITER ;;

CREATE PROCEDURE scooter_in_forbidden_zone(
    `a_list_of_coordinates` VARCHAR(5000),
    `a_point` VARCHAR(100)
    )

 BEGIN

     SELECT ST_Contains(ST_GeomFromText(CONCAT('MULTIPOLYGON((', a_list_of_coordinates, '))')), ST_GeomFromText(CONCAT('POINT(', a_point, ')'))) AS 'scooter_in_forbidden_zone';

  END
;;

DELIMITER ;

DROP TRIGGER IF EXISTS set_returned;

DELIMITER ;;
CREATE TRIGGER set_returned
AFTER DELETE ON customer2bike
FOR EACH ROW
BEGIN
    UPDATE bikes SET rented = false, username = null, speed = 0 WHERE id = OLD.bike_id;
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

-- Procedure get_all_customers()

DROP PROCEDURE IF EXISTS get_all_customers;

DELIMITER ;;

CREATE PROCEDURE get_all_customers()
 BEGIN

    SELECT surname,lastname,adress,billing_adress,username,email,balance,status,klarna
    FROM customer
    WHERE deleted = 0;

  END
;;

DELIMITER ;

-- Procedure get_customer_by_username()

DROP PROCEDURE IF EXISTS get_customer_by_username;

DELIMITER ;;

CREATE PROCEDURE get_customer_by_username(
                    `a_username` VARCHAR(50)
)
 BEGIN

   SELECT surname,lastname,adress,billing_adress,username,email,balance,status,klarna
     FROM customer
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure update_customer_info()

DROP PROCEDURE IF EXISTS update_customer_info;

DELIMITER ;;

CREATE PROCEDURE update_customer_info(
                    `a_username` VARCHAR(50),
                    `a_surname` VARCHAR(50),
                    `a_lastname` VARCHAR(50),
                    `a_adress` VARCHAR(50),
                    `a_billing_adress` VARCHAR(50),
                    `a_email` VARCHAR(50)
)
 BEGIN

   UPDATE customer
   SET
      surname = a_surname,
      lastname = a_lastname,
      adress = a_adress,
      billing_adress = a_billing_adress,
      email = a_email
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure update_customer_password()

DROP PROCEDURE IF EXISTS update_customer_password;

DELIMITER ;;

CREATE PROCEDURE update_customer_password(
                    `a_username` VARCHAR(50),
                    `a_password` VARCHAR(250)
)
 BEGIN

   UPDATE customer
   SET
      password = a_password
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure update_customer_balance()

DROP PROCEDURE IF EXISTS update_customer_balance;

DELIMITER ;;

CREATE PROCEDURE update_customer_balance(
                    `a_username` VARCHAR(50),
                    `a_value` INT
)
 BEGIN

   UPDATE customer
   SET
      balance = balance + a_value
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure set_customer_klarna()

DROP PROCEDURE IF EXISTS set_customer_klarna;

DELIMITER ;;

CREATE PROCEDURE set_customer_klarna(
                    `a_username` VARCHAR(50)
)
 BEGIN

   UPDATE customer
   SET
      klarna = true
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure remove_customer_klarna()

DROP PROCEDURE IF EXISTS remove_customer_klarna;

DELIMITER ;;

CREATE PROCEDURE remove_customer_klarna(
                    `a_username` VARCHAR(50)
)
 BEGIN

   UPDATE customer
   SET
      klarna = false
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure delete_customer()

DROP PROCEDURE IF EXISTS delete_customer;

DELIMITER ;;

CREATE PROCEDURE delete_customer(
                    `a_username` VARCHAR(50)
)
 BEGIN

   UPDATE customer
   SET
      deleted = true
    WHERE username = a_username;


  END
;;

DELIMITER ;

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

-- Procedure get_geometry_for_parkings()

DROP PROCEDURE IF EXISTS get_geometry_for_parkings;

DELIMITER ;;

CREATE PROCEDURE get_geometry_for_parkings()
 BEGIN

   SELECT geometry
     FROM parking;


  END
;;

DELIMITER ;

-- Procedure get_all_trips()

DROP PROCEDURE IF EXISTS get_all_trips;

DELIMITER ;;

CREATE PROCEDURE get_all_trips()
 BEGIN

    SELECT * from trips;

  END
;;

DELIMITER ;

-- Procedure get_all_trips_by_username()

DROP PROCEDURE IF EXISTS get_all_trips_by_username;

DELIMITER ;;

CREATE PROCEDURE get_all_trips_by_username(
                    `a_username` VARCHAR(50)
)
 BEGIN

   SELECT *
     FROM trips
    WHERE username = a_username;


  END
;;

DELIMITER ;

-- Procedure calculate_trip_cost()

DROP PROCEDURE IF EXISTS calculate_trip_cost;

DELIMITER ;;

CREATE PROCEDURE calculate_trip_cost(
    `a_username` VARCHAR(50)
)
 BEGIN
    SELECT starttime, endtime INTO @starttime, @endtime FROM trips WHERE username = a_username ORDER BY id DESC LIMIT 1;
    UPDATE trips SET cost = TIMESTAMPDIFF(SECOND, @starttime, @endtime) + 100 WHERE username = a_username ORDER BY id DESC LIMIT 1;

  END
;;

DELIMITER ;

DROP TRIGGER IF EXISTS insert_trip;

DELIMITER ;;
CREATE TRIGGER insert_trip
AFTER UPDATE ON bikes
FOR EACH ROW
BEGIN
 IF OLD.rented = false AND NEW.rented = true AND NEW.username IS NOT NULL THEN
    INSERT INTO trips (startposition,starttime,username)
    VALUES (NEW.geometry, CURRENT_TIMESTAMP, NEW.username);
 END IF;
 IF OLD.rented = true AND NEW.rented = false AND NEW.username IS NULL THEN
    UPDATE trips
       SET endposition = NEW.geometry, endtime = CURRENT_TIMESTAMP WHERE OLD.username = trips.username ORDER BY id DESC LIMIT 1;
    CALL calculate_trip_cost(OLD.username);
 END IF;
END;
;;

DELIMITER ;

-- Procedure get_startposition_and_endposition_of_last_trip()

DROP PROCEDURE IF EXISTS get_startposition_and_endposition_of_last_trip;

DELIMITER ;;

CREATE PROCEDURE get_startposition_and_endposition_of_last_trip(
          `a_username` VARCHAR(50)
)
 BEGIN

    SELECT startposition,endposition FROM trips WHERE username = `a_username` ORDER BY id DESC LIMIT 1;

  END
;;

DELIMITER ;

-- Procedure check_if_free_parking_to_parking()

DROP PROCEDURE IF EXISTS check_if_free_parking_to_parking;

DELIMITER ;;

CREATE PROCEDURE check_if_free_parking_to_parking(
    `a_list_of_coordinates` VARCHAR(5000),
    `startposition` VARCHAR(100),
    `endposition` VARCHAR(100)
)
 BEGIN

     SELECT ST_Contains(ST_GeomFromText(CONCAT('MULTIPOLYGON((', a_list_of_coordinates, '))')), ST_GeomFromText(CONCAT('POINT(', startposition, ')'))) INTO @scooter_taken_from_within_parking;
     IF @scooter_taken_from_within_parking=false
      THEN
      SELECT ST_Contains(ST_GeomFromText(CONCAT('MULTIPOLYGON((', a_list_of_coordinates, '))')), ST_GeomFromText(CONCAT('POINT(', endposition, ')'))) AS 'give_discount';
    ELSE
      SELECT false;
    END IF;

  END
;;

DELIMITER ;

-- Procedure give_discount()

DROP PROCEDURE IF EXISTS give_discount;

DELIMITER ;;

CREATE PROCEDURE give_discount(
                    `a_username` VARCHAR(50)
)
 BEGIN

    UPDATE trips SET discount = 50 WHERE username = `a_username` ORDER BY id DESC LIMIT 1;

  END
;;

DELIMITER ;

-- Procedure charge_customer()

DROP PROCEDURE IF EXISTS charge_customer;

DELIMITER ;;

CREATE PROCEDURE charge_customer(
                    `a_username` VARCHAR(50)
)
 BEGIN

    SELECT cost + discount FROM trips WHERE username = `a_username` ORDER BY id DESC LIMIT 1 INTO @total_cost;

    UPDATE customer SET balance = IF(klarna IS TRUE, balance, balance - @total_cost) WHERE username = `a_username`;

  END
;;

DELIMITER ;

-- Procedure get_all_zones()

DROP PROCEDURE IF EXISTS get_all_zones;

DELIMITER ;;

CREATE PROCEDURE get_all_zones()
 BEGIN

    SELECT * from zones;

  END
;;

DELIMITER ;

-- Procedure get_all_forbidden_zones()

DROP PROCEDURE IF EXISTS get_all_forbidden_zones;

DELIMITER ;;

CREATE PROCEDURE get_all_forbidden_zones()
 BEGIN

   SELECT geometry
     FROM zones
    WHERE `type` = 'forbidden';


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
