import { client } from "./index.js";
import bcrypt from 'bcrypt';
import {usersRouter} from "./routes/users.js";

async function getmovisbyid(id) {
  return await client.db("movis").collection("movis").findOne({ id: id });
}
async function postmovis(data) {
  return await client.db("movis").collection("movis").insertMany(data);
}
async function getmovis() {
  return await client.db("movis").collection("movis").find({}).toArray();
}
async function postuser({username : username,password :hashpassword}){
  return await client.db("users").collection("users").insertMany([{username : username,password :hashpassword}]);
}
async function getallusers(){
  return await client.db("users").collection("users").find({}).toArray();
}
async function getuserbyname(username){
  return await client.db("users").collection("users").findOne({username:username});
}
async function genpassword(password) {
  const no_of_rounds = 10;
  const salt = await bcrypt.genSalt(no_of_rounds);
  console.log(salt);
  const hashpassword = await bcrypt.hash(password,salt);
  console.log(hashpassword);
  return hashpassword;
}
//genpassword(password);
export { getmovis, postmovis, getmovisbyid, genpassword, getuserbyname,postuser,getallusers };
