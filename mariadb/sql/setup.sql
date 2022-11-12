DROP TABLE IF EXISTS `data`;

CREATE TABLE IF NOT EXISTS `data` (
`id` INT NOT NULL,
`latitude` FLOAT,
`longitude` FLOAT,
PRIMARY KEY (`id`))
ENGINE = InnoDB
CHARSET utf8
COLLATE utf8_swedish_ci
;
