'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { handle } = require('express/lib/application');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL)
const server = express();
server.use(cors());
server.use(express.json());

let moviseData = require('./Movie Data/data.json');
const { Axios, default: axios } = require('axios');
const { port } = require('pg/lib/defaults');
const { res } = require('express');
const req = require('express/lib/request');

server.get('/', handleHomePage);
server.get('/favorite', handlefavoritePage);

server.get('/search', handleseacrhPage);
server.get('/trending', handletrendingPage);
server.post('/addMovie', handleaddmovie);
server.get('/getMovie', handlegetmovie);
server.put('/Update/:id', handelUpdate);
server.delete('/delete/:id', handledelete);
server.get('/getMovie/:id', handlegetByid);

server.use('* ', handleNotFound);
//server.use(errorhandler);

function MoviseData(title, posterpath, overview) {
    this.title = title;
    this.posterpath = posterpath;
    this.overview = overview;
}
function Movise(id, title, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;

}
function handleHomePage(req, res) {
    his()
    let obj = new MoviseData(moviseData.title, moviseData.poster_path, moviseData.overview)
    return res.status(200).json(obj);
}


function handlefavoritePage(req, res) {
    return res.status(200).send('welcome to favorite page');
}



function handletrendingPage(req, res) {
    //   let newArr = [];
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}&language=en-US`)
        .then((result) => {
            console.log(result.data.results);
            let newArr = result.data.results.map(movise => {
                return (new Movise(movise.id, movise.title, movise.poster_path, movise.overview))
                //   console.log(result)
                //             let movies = result.data.results.map(movise => {
                //                 return new Movise(movise.id,
                //                     movise.title,
                //                     movise.poster_path,
                //                     movise.overview
                //                     )


            })
            res.status(200).json(newArr);
            //})
            //    res.status(200).json(Movise)
        }).catch((err) => {
            errorhandler(error, req, res)
        })
}



function handleseacrhPage(req, res) {
    // https://api.themoviedb.org/3/movie/550?api_key=81adea6bfc4c3d144867465a033a6727
    // https://api.themoviedb.org/3/search/movie?api_key=$%7Bprocess.env.APIKEY%7D&language=en-US&query=the&page=2
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=the&page=2`;
    console.log(url);
    axios.get(url)
        .then((result) => {
            console.log(result)
            let movies = result.data.results.map(movise => {
                return new Movise(movise.id,
                    movise.title,
                    movise.poster_path,
                    movise.overview
                )


            })
            res.status(200).json(movies);
        }).catch((err) => {
            errorhandler(err, req, res)
        })
    // res.status(200).json(movies);

}
function handleaddmovie(req, res) {
    const movie = req.body;
    console.log(movie)
    let sql = `INSERT INTO movies (title,poster_path, overview)VALUES($1,$2,$3) RETURNING *;`;

    let values = [movie.title, movie.poster_path, movie.overview];
    client.query(sql, values)
        .then(result => {
            res.status(200).json(result.rows)
        }).
        catch(err => {
            //  console.log(err);
            // errorhandler(error,req,res);
        });

}


function handlegetmovie(req, res) {
    let sql = 'SELECT * FROM movies;';
    client.query(sql).then(result => {
        res.status(200).json(result.rows)
        // res.send(result)
    })//.catch(error=>{
    //     errorhandler(error,req,res);
    // });
}

function handelUpdate(req, res) {
     const id = req.params.id;
    const movie = req.body;
    const sql = `UPDATE movies 
    SET title=$1, poster_path=$2, overview=$3
    WHERE id = $4 RETURNING *;`;
    let values = [movie.title, movie.poster_path, movie.overview, id];
    client.query(sql, values).then(result => {
        res.status(200).json(result.rows);

     })
}
   

    function handledelete(req, res) {
        const id = req.params.id;
        const sql = `DELETE FROM movies WHERE id=${id};`
        client.query(sql).then(() => {
            res.status(200).json(`DELETE MOVIES DONE!`)
        }).catch(err => {
            //hello          
        })

    }
    function handlegetByid(req, res) {
        const id = req.params.id;
        const sql = `SELECT * FROM movies WHERE id=$1;`;
        const values = [id];
        client.query(sql,values).then(result => {
            res.status(200).json(result.rows)
        }).catch((err) => { })
    }

    handleNotFound
    function handleNotFound(req, res) {
        return res.status(404).send('page not not exist')

    }
    server.use((err, req, res, next) => { res.status(500).send({ error: "something went wrong 500 Status !!!" }); })
    // function errorhandler(error, req, res) {
    //     let errObj = {
    //         status: 500,
    //         message: error,
    //     }

    //     res.status(500).send(errObj);
    // }
    // function errorhandler(error, req, res) {
    //     const err = {
    //         status: 500,
    //         message: error
    //     }
    //     res.status(500).send(error);
    // }

    //  server.listen(port,()=>{
    //     console.log(`my server listen to port${port}`)});


    client.connect().then(() => {
        server.listen(process.env.PORT, () => {
            console.log(`my server listen to port ${process.env.PORT}`)
        })
    })