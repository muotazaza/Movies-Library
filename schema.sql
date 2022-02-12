DROP TABLE IF EXISTS movies;

CREATE TABLE IF NOT EXISTS movies(
    id  SERIAL PRIMARY KEY ,
    title VARCHAR (225),
    poster_path VARCHAR (225),
    overview VARCHAR (1000)
);