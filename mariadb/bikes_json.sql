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
CHECK (JSON_VALID(jsonfield)));

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

-- Procedure get_bikes()

DROP PROCEDURE IF EXISTS get_bikes;

DELIMITER ;;

CREATE PROCEDURE get_bikes()

SELECT JSON_MERGE_PATCH(JSON_OBJECT('id', id),
       JSON_SET(jsonfield, '$.properties.id', id))
    AS 'bikes'
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

-- Procedure add_bike()

DROP PROCEDURE IF EXISTS add_bike;

DELIMITER ;;

CREATE PROCEDURE add_bike(
                    `a_jsonfield` VARCHAR(1024)
                             )
     BEGIN

                   INSERT
                     INTO `bikes_json` (jsonfield)
                   VALUES (a_jsonfield);

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



insert into bikes_json (jsonfield) VALUES (' { "position": { "type": "Feature", "geometry": { "type": "Point", "coordinates": [16.371662891697607, 59.40388342350176] } }, "properties": { "whole": false, "charging": false, "blocked": true, "batterywarning": false, "batterydepleted": false, "rented": false, "userid": 1, "featureType": "bikes"} } ');
insert into bikes_json (jsonfield) VALUES (' { "position": { "type": "Feature", "geometry": { "type": "Point", "coordinates": [16.371662891697607, 59.40388342350176] } }, "properties": { "whole": false, "charging": false, "blocked": true, "batterywarning": false, "batterydepleted": false, "rented": false, "userid": 1, "featureType": "bikes"} } ');
insert into bikes_json (jsonfield) VALUES (' { "position": { "type": "Feature", "geometry": { "type": "Point", "coordinates": [16.371662891697607, 59.40388342350176] } }, "properties": { "whole": false, "charging": false, "blocked": true, "batterywarning": false, "batterydepleted": false, "rented": false, "userid": 1, "featureType": "bikes"} } ');
