//const { response, query } = require('express');
//const express = require('express'); // for type : ommonjs
import express, { request, response } from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import {movisRouter} from "./routes/movis.js";
import { getmovis, postmovis, getmovisbyid } from "./hlp.js";

dotenv.config();
//const { request } = require('http');
const app = express();

const PORT = process.env.PORT;
console.log(PORT);
//9000;
app.use(express.json());

app.get("/",(request,response) => {
    response.send("hiiiii :)) this is dhanya")
});
//const MONGO_URL = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;
//mongodb+srv://dhanya:<password>@cluster0.5vqmt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

async function CreateConnection(){
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log(" mongo connected");
  return client;
}
export const client = await CreateConnection();
//movis = JSON.stringify(movis);
//(movis);

app.listen(PORT, () => console.log("app started"));

app.use("/movis",movisRouter)