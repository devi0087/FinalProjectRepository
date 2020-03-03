const express = require("express");
const router = express.Router();
const {sup} = require("../middleware/custom");

router.get("/animals", sup, (req, res)=>{
    //handles /animals/
    res.json({data: req.message});
})
.post((req, res)=>{})
.put((req, res)=>{})
.delete((req, res)=>{})

router.route("/:name")
.get((req, res)=>{
     //handles /animals/giraffe
    res.json({data: req.params.name});
})
module.exports = router;