'use strict'
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const axios =require(axios)

 
const port=process.env.port;

const server =express(); 
server.use(cors());
 
//let moviseData =require ('/Movie data/data.json');

const { default: axios } = require("axios");
server.get('/',handlerhomepage);
server.get('/favorite',handlerfavorite);
server.get('/trends',handlertrends);
server.get('/search',handlersearch);

server.get('*',handlernotfound);
server.use(errorhandel);

function data(title , poster_path ,overview){
    this.title=title;
    this.poster_path=poster_path;
    this.overview= overview;
}
function handlerhomepage (_requset, respons){
   
let obj =new data(moviseData.title ,moviseData.poster_path ,moviseData.overview)
return respons.status(200).json(obj); 
} 

function handlertrends(_requset,_respons){
axios.get(url)
.then((result)=>{
    result.data.movise.forEach(movise => {
        newarr.push(new movise(movise.id,movise.title,movise.poster_path,movise.overview))
        
    });
}).catch((err)=>{

})
}; 




function handlersearch(_requset,_respons){
    let url ='https://api.themoviedb.org/3/movie/550?api_key= 81adea6bfc4c3d144867465a033a6727';
axios.get(url)
.then((result)=>{
    let recipemoviess =result.data.movise.map(movise =>{movise.id,movise.title,movise.poster_path,movise.overview

    })
})

};

function handlerfavorite (_requset, respons){
    return respons.status(200).send('wellcome to favorite page'); 

   

} 
function handlernotfound (_requset, respons){
      return respons.status(404).send("page not found error");

  }
  function handlerror(_requset,respons){
      const err={
          status:500,
          message:error,
      }
      respons.status(500).send(err);
  }
    
server.listen(3000,()=>{
    console.log('my server listen to port 3000');
})