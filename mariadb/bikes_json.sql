DROP TABLE IF EXISTS bikes_json;
CREATE TABLE bikes_json (
id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
jsonfield VARCHAR(1024),
userid INTEGER as (JSON_VALUE(jsonfield,'$.properties.userid')),
scooter_id INTEGER as (JSON_VALUE(jsonfield,'$.properties.id')),
whole BOOLEAN as (JSON_VALUE(jsonfield,'$.properties.whole')),
charging BOOLEAN as (JSON_VALUE(jsonfield,'$.properties.charging')),
blocked BOOLEAN as (JSON_VALUE(jsonfield,'$.properties.blocked')),
battery_warning BOOLEAN as (JSON_VALUE(jsonfield,'$.properties.batterywarning')),
battery_depleted BOOLEAN as (JSON_VALUE(jsonfield,'$.properties.batterydepleted')),
rented BOOLEAN as (JSON_VALUE(jsonfield,'$.properties.rented')),
gis_point POINT as ( ST_GeomFromGeoJSON(JSON_QUERY( jsonfield, '$.position.geometry')) ),
CHECK (JSON_VALID(jsonfield)))
ENGINE = InnoDB
;

ALTER TABLE bikes_json ADD CONSTRAINT check_bike
    CHECK(
            /* JSON_EXISTS(jsonfield, '$.id') */
            JSON_TYPE(JSON_VALUE(jsonfield, '$.id')) = 'INTEGER'
            AND JSON_EXISTS(jsonfield, '$.position')
            AND JSON_TYPE(JSON_QUERY(jsonfield, '$.position')) = 'OBJECT'
            AND JSON_EXISTS(jsonfield, '$.properties')
            AND JSON_TYPE(JSON_QUERY(jsonfield, '$.properties')) = 'OBJECT'
            /* AND JSON_EXISTS(jsonfield, '$.properties.id') */
            AND JSON_TYPE(JSON_VALUE(jsonfield, '$.properties.id')) = 'INTEGER'
            AND JSON_EXISTS(jsonfield, '$.properties.userid')
            AND JSON_TYPE(JSON_VALUE(jsonfield, '$.properties.userid')) = 'INTEGER'
            AND JSON_EXISTS(jsonfield, '$.properties.featureType')
            AND JSON_TYPE(JSON_EXTRACT(jsonfield, '$.properties.featureType')) = 'STRING'
            AND JSON_VALUE(jsonfield, '$.properties.featureType') = 'bikes'
            AND JSON_EXISTS(jsonfield, '$.position.type')
            AND JSON_TYPE(JSON_EXTRACT(jsonfield, '$.position.type')) = 'STRING'
            AND JSON_VALUE(jsonfield, '$.position.type') = 'Feature'
            AND JSON_EXISTS(jsonfield, '$.position.geometry')
            AND JSON_TYPE(JSON_QUERY(jsonfield, '$.position.geometry')) = 'OBJECT'
            AND JSON_EXISTS(jsonfield, '$.position.geometry.type')
            AND JSON_TYPE(JSON_EXTRACT(jsonfield, '$.position.geometry.type')) = 'STRING'
            AND JSON_VALUE(jsonfield, '$.position.geometry.type') = 'Point'
            AND JSON_EXISTS(jsonfield, '$.position.geometry.coordinates')
            AND JSON_TYPE(JSON_QUERY(jsonfield, '$.position.geometry.coordinates')) = 'ARRAY'
            AND JSON_TYPE(JSON_VALUE(jsonfield, '$.position.geometry.coordinates[0]')) = 'DOUBLE'
            AND JSON_TYPE(JSON_VALUE(jsonfield, '$.position.geometry.coordinates[1]')) = 'DOUBLE'
            AND JSON_EXISTS(jsonfield, '$.properties.whole')
            AND JSON_TYPE(JSON_EXTRACT(jsonfield, '$.properties.whole')) = 'BOOLEAN'
            AND JSON_EXISTS(jsonfield, '$.properties.charging')
            AND JSON_TYPE(JSON_EXTRACT(jsonfield, '$.properties.charging')) = 'BOOLEAN'
            AND JSON_EXISTS(jsonfield, '$.properties.blocked')
            AND JSON_TYPE(JSON_EXTRACT(jsonfield, '$.properties.blocked')) = 'BOOLEAN'
            AND JSON_EXISTS(jsonfield, '$.properties.batterywarning')
            AND JSON_TYPE(JSON_EXTRACT(jsonfield, '$.properties.batterywarning')) = 'BOOLEAN'
            AND JSON_EXISTS(jsonfield, '$.properties.batterydepleted')
            AND JSON_TYPE(JSON_EXTRACT(jsonfield, '$.properties.batterydepleted')) = 'BOOLEAN'
            AND JSON_EXISTS(jsonfield, '$.properties.rented')
            AND JSON_TYPE(JSON_EXTRACT(jsonfield, '$.properties.rented')) = 'BOOLEAN'
    );

/* DELIMITER // */
/*  */
/* CREATE OR REPLACE TRIGGER after_insert_bike */
/* BEFORE INSERT ON bikes_json FOR EACH ROW */
/* BEGIN */
/* UPDATE bikes_json SET NEW.jsonfield = JSON_REPLACE(NEW.jsonfield, '$.properties.id', NEW.id); */
/* END; // */
/*  */
/* DELIMITER ; */

-- Procedure get_bikes_within_bounding_box()

DROP PROCEDURE IF EXISTS get_bikes_within_bounding_box;

DELIMITER ;;

CREATE PROCEDURE get_bikes_within_bounding_box(
                    `a_bounding_box` VARCHAR(1024)
)

            SELECT id
              FROM bikes_json
             WHERE ST_CONTAINS(ST_GeomFromGeoJSON(a_bounding_box), ST_GeomFromGeoJSON(JSON_QUERY(jsonfield, '$.position.geometry')));

;;

DELIMITER ;
-- Procedure get_bikes()

DROP PROCEDURE IF EXISTS get_bikes;

DELIMITER ;;

CREATE PROCEDURE get_bikes()

SELECT JSON_MERGE_PATCH(JSON_OBJECT('id', id),
       JSON_SET(jsonfield, '$.properties.id', id))
    AS 'bike'
  FROM bikes_json;

;;

DELIMITER ;

-- Procedure get_bike_by_id()

DROP PROCEDURE IF EXISTS get_bike_by_id;

DELIMITER ;;

CREATE PROCEDURE get_bike_by_id(
                        `a_bike_id` INTEGER
                             )
             BEGIN

                SELECT JSON_MERGE_PATCH(JSON_OBJECT('id', id),
                       JSON_SET(jsonfield, '$.properties.id', id))
                    AS 'bike'
                  FROM bikes_json
                 WHERE id = a_bike_id;


              END
;;

DELIMITER ;

-- Procedure update_bike()

DROP PROCEDURE IF EXISTS update_bike;

DELIMITER ;;

CREATE PROCEDURE update_bike(
                    `a_scooter_id` INTEGER,
                    `a_partial_scooter` VARCHAR(1024)
                             )
     BEGIN

        /* SELECT jsonfield  */
        /*   FROM bikes_json */
        /*  WHERE id = `a_scooter_id` */
        /*   INTO @scooter_to_update; */

           UPDATE `bikes_json`
              SET jsonfield = (JSON_MERGE_PATCH(jsonfield, a_partial_scooter))
              /* SET jsonfield = (JSON_MERGE_PATCH(@scooter_to_update, a_partial_scooter)) */
            WHERE id = `a_scooter_id`;

      END
    ;;

    DELIMITER ;

-- Procedure add_bike()

DROP PROCEDURE IF EXISTS add_bike;

DELIMITER ;;

CREATE PROCEDURE add_bike(
                    `a_default_scooter` VARCHAR(1024),
                    `a_partial_scooter` VARCHAR(1024)
                             )
     BEGIN

                   INSERT
                     INTO `bikes_json` (jsonfield)
                   VALUES (JSON_MERGE_PATCH(a_default_scooter, a_partial_scooter));

      END
    ;;

    DELIMITER ;

-- Procedure delete_bike()

DROP PROCEDURE IF EXISTS delete_bike;

DELIMITER ;;

CREATE PROCEDURE delete_bike(
                    `a_bike_id` INTEGER
                             )
     BEGIN

                   DELETE
                     FROM `bikes_json`
                    WHERE id = a_bike_id;

      END
    ;;

    DELIMITER ;



-- INSERT INTO bikes_json (jsonfield) VALUES (' { "position": { "type": "Feature", "geometry": { "type": "Point", "coordinates": [16.371662891697607, 59.40388342350176] } }, "properties": { "whole": false, "charging": false, "blocked": true, "batterywarning": false, "batterydepleted": false, "rented": false, "userid": 1, "featureType": "bikes"} } ');
