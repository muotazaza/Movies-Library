DROP TABLE IF EXISTS movise; 

CREATE TABLE IF EXISTS movise(
    id SERIAL PRIMARY KEY,
    title  VARCHAR(1000),
    poster_path  VARCHAR(1000),
    overview VARCHAR(1000),
);