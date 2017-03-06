\c "host=localhost port=5432 connect_timeout=15 user=postgres password=Mr@R0b0t"

SET ROLE TO postgres;
DROP DATABASE IF EXISTS customer_tracking;

CREATE DATABASE customer_tracking;

\c customer_tracking

DROP TABLE IF EXISTS time_positions;
CREATE TABLE time_positions (
  ID SERIAL PRIMARY KEY,
  timeLabel TIMESTAMP NOT NULL,
  macAddress MACADDR NOT NULL,
  coordinates POINT NOT NULL,
  UNIQUE (timeLabel, macAddress)
);

