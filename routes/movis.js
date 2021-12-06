import express from "express";
const router = express.Router();
import { getmovis, postmovis, getmovisbyid } from "../hlp.js";


router.get("/",async (request,response) => {
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
    const filtermovis = await getmovis();
    console.log(filtermovis);
    response.send(filtermovis);
});
router.post("/",async(request,response)=>{
  const data = request.body;
  console.log(data);
  const result = await postmovis(data);
  response.send(data);

})

// app.get("/movis/language",(request,response) => {
//     console.log(request.query)
//     const engmovi = movis.find((mv)=>mv.language == "english");
//     response.send(engmovi);
// });

router.get("/:id",async (request,response) => {
    console.log(request.params);
    const {id} =request.params;
    const movi = await getmovisbyid(id)
    //const movi = movis.filter((mv)=>mv.id == id);
    //response.send(movi);
    //const movi = movis.find((mv)=>mv.id == id);
    movi ? response.send(movi) : response.status(404).send({message : "no macthing movi found"})
});

export const movisRouter=router;