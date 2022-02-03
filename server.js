'use strict'
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const axios = require('axios')
const pg = require('pg')

const port = process.env.port;
const client = new pg.Client(process.env.DATABASE_URL);

const server = express();
server.use(cors());
server.use(express.json());

//let moviseData =require ('/Movie data/data.json');

//const { default: axios } = require("axios");
//const { request, response } = require('express');
server.get('/', handlerhomepage);
server.get('/favorite', handlerfavorite);
server.get('/trends', handlertrends);
server.get('/search', handlersearch);
server.post('/addMovie', addMoviesHandler);
server.get('/getMovies', getmoviesHandler);
server.put('/updatemovies:id', updarmoviesHandler);
server.delete('/deletemovies:id', deletemoviesHandler);
server.get('/getMovies:id', ggetmoviesHandler);


server.get('*', handlernotfound);
server.use(errorhandel);

function data(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}

function handlerhomepage(request, respons) {
    //  console.log(request)
    let obj = new data(moviseData.title, moviseData.poster_path, moviseData.overview)
    return respons.status(200).json(obj);
}




//
function addMoviesHandler(request, _respons) {

    const movies = request.body;

    let sql = `INSERT INTO movives(title,poster_path,overview) VALUES ($1,$2,$3) RETURNING *;`
    let values = [movies.title, movies.poster_path, movies.overview];
    client.query(sql, values).then(data => {
        res.status(200).json(data.rows);
    }).catch(error => {
        errorHandler(error, request, response)
    });

};

function getmoviesHandler(request, _response) {

    let sql = `SELECT * FROM movies;`;
    client.query(sql).then(data => {
        res.status(200).json(data.rows);
    }).catch(error => {
        errorHandler(error, request, response)
    });
}



function handlertrends(_requset, response) {
    axios.get(url)
        .then((result) => {
            result.data.movise.forEach(movise => {
                newarr.push(new movise(movise.id, movise.title, movise.poster_path, movise.overview))

            });
        }).catch((_err) => {

        })
};




function handlersearch(requset, respons) {
    let url = 'https://api.themoviedb.org/3/movie/550?api_key= 81adea6bfc4c3d144867465a033a6727';
    axios.get(url)
        .then((result) => {
            let recipemoviess = result.data.movise.map(movise => {
                movise.id, movise.title, movise.poster_path, movise.overview

            })
        })

};

function handlerfavorite(requset, respons) {
    return respons.status(200).send('wellcome to favorite page');



}


function updarmoviesHandler(request, respons) {
    const id = request.params.id;
    const sql = 'UPDATE moviess SET title=$1,poster_path=$2,overview=$3 WHERE ID =$4 ; RETURNING *'
    let values = [movies.title, movies.poster_path, movies.overview, id];
    client.query((sql, values).then(data => {

        respons.status(200).json(data.rows);
    })
        /* table_name *//*
    SET title = movise.title, poster_path = movise.poster_path, overview = movise.overview,
    WHERE condition;*/

    )

    function deletemoviesHandler(request, respons) {
        const id = request.params.id;
        const sql = 'DELETE FROM movies WHERE ID=${id}'
        client.query(sql).then(() =>
            respons.status(200).json("the movies has been deleted")
            .catch(error(error => {
                errorHandler(error, req, res);
            }) ;
            
            function ggetmoviesHandler(request,respons){
                const id =request.params.id; 
                const sql ='SELECT *FROM MOVIES WHERE ID =${id}';
                client.query(sql).then(data => {
                    res.status(200).json(data.rows);
                }).catch(error => {
                    errorHandler(error, request, response)
                });


            }

        function handlernotfound(requset, respons) {
            return respons.status(404).send("page not found error");

        }
        function errorhandel(requset, respons) {
            const err = {
                status: 500,
                message: error,
            }
            respons.status(500).send(err);
            //h
        };


        client.connect().then(() => {
            server.listen(PORT, () => {
                console.log(`listining to port ${PORT}`)
            })
        })

// server.listen(3000,()=>{
//     console.log('my server listen to port 3000');
// })
// server.listen(3000,()=>{
//     console.log('my server listen to port 3000 ')
