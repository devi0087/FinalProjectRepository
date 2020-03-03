const express = require("express");
const app = express();
const cors = require("cors");
const animals = require("./routes/animals");
const port = process.env.port || 1234;
//console.log( process.env.PATH );
const {hey, sup} = require("./middleware/custom");

/*function hey(req, res, next){
    console.log('HEY', req.url, Date.now());
    next();//
}*/
app.use(hey);
app.use(cors());
app.use("/animals", animals);
app.get("/", (req, res)=>{
    res.json({data: 123});
})
.post((req, res)=>{})
.put((req, res)=>{})
.delete((req, res)=>{})
app.get("/animals", sup, (req, res)=>{
    res.json({data: req.message});
})

app.listen(port, (err)=>{
if(err){
    console.log(err);
    return;
}
console.log(`Listening on port ${port}`)
})