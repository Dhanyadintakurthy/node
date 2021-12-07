import express from "express";
import bcrypt from 'bcrypt';
const router = express.Router();
import { genpassword, getuserbyname ,postuser,getallusers} from "../hlp.js";
import jwt from 'jsonwebtoken';

router.get("/",async (request,response) => {
    const allusers = await getallusers();
    console.log(allusers);
    response.send(allusers);
});

router.post("/signin",async(request,response)=>{
  const data = request.body;
  //console.log(data);
  const password = data.password;
  const username = data.username;
  const userdb = await getuserbyname(username);
  //console.log(userdb);
  
  if(userdb){
      response.status(400).send({message : "username already exists"})
      return;
  }
  else{
    if(password.length <8) {
        response.status(400).send({message : "your password is too short"})
        return;
      }
      else{
        await postuser(data);
        const hashpassword = await genpassword(password);
        response.send({username : username,password :hashpassword});
        //response.send(data);
        return;
      }
  }
  

});
router.post("/login",async(request,response)=>{
    //const [username,password] = request.body;
    const data = request.body;
    //console.log(data);
    const password = data.password;
    const username = data.username;
    const userdb = await getuserbyname(username);

    if(!userdb){
        response.status(401).send({message:"invalid username"});
        return;
    }
    const storedpassword = userdb.password;
    //console.log(storedpassword);
    //console.log(password);
    // const passwordmatch = await bcrypt.compare(password,storedpassword);
    console.log(userdb);
    //response.send(userdb);
    if(password==storedpassword){
        const token = jwt.sign({id : userdb._id},'process.env.SECRET_KEY')
        response.send({message:"login successful",token:token});
        return;
    }
    else{
        response.status(401).send({message:"incorrect id or passwoord"});
        return;
    }
});

export const usersRouter=router;