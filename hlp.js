import { client } from "./index.js";

async function getmovisbyid(id) {
  return await client.db("movis").collection("movis").findOne({ id: id });
}
async function postmovis(data) {
  return await client.db("movis").collection("movis").insertMany(data);
}
async function getmovis() {
  return await client.db("movis").collection("movis").find({}).toArray();
}
export { getmovis, postmovis, getmovisbyid };
