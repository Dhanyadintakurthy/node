const fs = require("fs");
const { text } = require("stream/consumers");

fs.readFile("trailtext.txt", "utf-8",(err,data) => {
    console.log(data);
});

const quote = "rise and shine";

fs.writeFile("awsm.txt",quote,err => {
    console.log("finish!!");
})  
//create multiple files in backup
//deletee file with unfile

