-- docker-init/init.sql
CREATE TABLE IF NOT EXISTS individuals (
    id VARCHAR(255) NOT NULL PRIMARY KEY, -- Primary Key
    name VARCHAR(255),
    gender VARCHAR,
    birth_date DATE,
    death_date DATE,
    breed VARCHAR(255),
    trait VARCHAR(255),
    inbreeding NUMERIC,
    deceased VARCHAR,
    founder VARCHAR,
    father_id VARCHAR(255),
    mother_id VARCHAR(255)
);