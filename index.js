//const { response, query } = require('express');
//const express = require('express'); // for type : ommonjs
import express, { request, response } from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();
//const { request } = require('http');
const app = express();

const PORT = 9000;
app.use(express.json());

app.get("/",(request,response) => {
    response.send("hiiiii :)) this is dhanya")
});

var movis = [{
    
  "id": "100",
  "name": "Iron man 2",
  "poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
  "rating": 7,
  "summary": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
  "trailer": "https://www.youtube.com/embed/wKtcmiifycU"
},
{
  
  "id": "101",
  "name": "No Country for Old Men",
  "poster": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
  "rating": 8.1,
  "summary": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
  "trailer": "https://www.youtube.com/embed/38A__WT3-o0"
},
{
  
  "id": "102",
  "name": "Jai Bhim",
  "poster": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
  "rating": 8.8,
  "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
  "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA"
},
{
 
  "id": "103",
  "name": "The Avengers",
  "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
  "rating": 8,
  "summary": "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
  "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8"
},
{
  
  "id": "104",
  "name": "Interstellar",
  "poster": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
  "rating": 8.6,
  "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
  "trailer": "https://www.youtube.com/embed/zSWdZVtXT7E"
},
{
  
  "id": "105",
  "name": "Baahubali",
  "poster": "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
  "rating": 8,
  "summary": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
  "trailer": "https://www.youtube.com/embed/sOEg_YZQsTI"
},
{
  
  "id": "106",
  "name": "Ratatouille",
  "poster": "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
  "rating": 8,
  "summary": "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
  "trailer": "https://www.youtube.com/embed/NgsQ8mVkN8w"
}
]

//const MONGO_URL = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;
//mongodb+srv://dhanya:<password>@cluster0.5vqmt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

async function CreateConnection(){
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log(" mongo connected");
  return client;
}
const client = await CreateConnection();
//movis = JSON.stringify(movis);
//(movis);

app.get("/movis",async (request,response) => {
    //console.log(request.query);
    //const {rating}=request.query;
    // console.log(rating);
    // if(rating){
    //     const filtermovis = movis.filter((mv) => mv.rating == rating );
    //     response.send(filtermovis);
    // }
    // else{
    //     response.send(movis);
    // }
    const filtermovis = await client.db("movis").collection("movis").find({}).toArray();
    console.log(filtermovis);
    response.send(filtermovis);
});
app.post("/movis",async(request,response)=>{
  const data = request.body;
  console.log(data);
  const result = await client.db("movis").collection("movis").insertMany(data);
  response.send(data);

})

// app.get("/movis/language",(request,response) => {
//     console.log(request.query)
//     const engmovi = movis.find((mv)=>mv.language == "english");
//     response.send(engmovi);
// });

app.get("/movis/:id",async (request,response) => {
    console.log(request.params);
    const {id} =request.params;
    const movi = await client.db("movis").collection("movis").findOne({id: id})
    //const movi = movis.filter((mv)=>mv.id == id);
    //response.send(movi);
    //const movi = movis.find((mv)=>mv.id == id);
    movi ? response.send(movi) : response.status(404).send({message : "no macthing movi found"})
});

app.listen(PORT, () => console.log("app started"));