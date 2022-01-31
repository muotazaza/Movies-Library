'use strict'
const express = require("express");
const cors = require("cors");

 
const server =express(); 
server.use(cors());
 
let moviseData =require ('/Movie data/data.json');
server.get('/',handelhomepage);
server.get('/favorite',handelfavorite);
server.get('*',handelnotfound);

function data(title , poster_path ,overview){
    this.title=title;
    this.poster_path=poster_path;
    this.overview= overview;
}
function handelhomepage (requset, respons){
   
let obj =new data(moviseData.title ,moviseData.poster_path ,moviseData.overview)
return respons.status(200).json(obj); 
} 


function handelfavorite (requset, respons){
    return respons.status(200).send('wellcome to favorite page'); 

   

} 
function handelnotfound (requset, respons){
      return respons.status(404).send("page not found error");

  }
    
server.listen(3000,()=>{
    console.log('my server listen to port 3000');
})