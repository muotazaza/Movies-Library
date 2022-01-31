'use strict'
const express = require("express");
const cors = require("cors");
 
const server =express(); 
server.use(cors());

server.get('/',handleget)
server.get('/favorite',handleget2)
server.get('/',handledata)

function Movdata(title ,poster_path , overview){
    this.title=title;
    this.poster_path=poster_path
    this.overview= overview
}



function handleget (requset, respons){
    return respons.status(404).send("page not found error")

} 


function handleget2 (requset, respons){
    return respons.status(500).send("Sorry, something went wrong")

} 
function handledata (requset, respons){
    console.log(Movdata.title);
    console.log(Movdata.poster_path);
    console.log(overview)
    //console.log(data); 
return respons.status(200).js; 
} 
