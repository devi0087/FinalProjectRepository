
const sanitizeBody = require("../../middleware/sanitizeBody");
const gift = require("../../models/gift");
const router = require("express").Router();
const User = require('../../models/User');
const authorize = require('../../middleware/auth');

router.get("/",authorize, async (req, res) => {
    const gifts = await gift.find();
    res.send({ data:  gifts });
});

router.post("/",authorize, sanitizeBody, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -__v');
  console.log(user);
  const isadmin = user.checkAdmin();
  //console.log(isadmin);
  if (isadmin){
  try {
    const newgift = new gift(req.sanitizedBody);
    await newgift.save();
    res.status(201).send({ data: newgift });
  } catch (err) {
    sendResourceNotFound(err);
  }
}else{
  sendForbidden(req, res);
}
});

router.get("/:id",authorize, async (req, res) => {
    try {
        const  gift = await gift.findById(req.params.id).populate("gifts");
        if (! gift) throw new Error("Resource not found");
        res.send({ data: course });
      } catch (err) {
        sendResourceNotFound(req, res);
      }
});

router.patch("/:id",authorize, sanitizeBody, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -__v');
  //console.log(user);
  const isadmin = user.checkAdmin();
  //console.log(isadmin);
  if (isadmin){
    try {
      const newgift = new gift(req.sanitizedBody);
    //await newCourse.save();
    //res.send({ data: newCourse });
        const { _id, ...otherAttributes } = newgift;
        const  gift = await gift.findByIdAndUpdate(
          req.params.id,
          req.sanitizedBody,
          {
            new: true,
            runValidators: true
          }
        );
        if (! gift) throw new Error("Resource not found");
        res.send({ data:  gift });
      } catch (err) {
        sendResourceNotFound(req, res);
      }
    }else{
      sendForbidden(req, res);
    }
});

router.put("/:id",authorize, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -__v');
  //console.log(user);
  const isadmin = user.checkAdmin();
  //console.log(isadmin);
  if (isadmin){
    try {
        const { _id, ...otherAttributes } = req.body;
        const  gift = await gift.findByIdAndUpdate(
          req.params.id,
          req.sanitizedBody,
          {
            new: true,
            overwrite: true,
            runValidators: true
          }
        );
        if (! gift) throw new Error("Resource not found");
        res.send({ data:  gift });
      } catch (err) {
        sendResourceNotFound(req, res);
      }
    }else{
      sendForbidden(req, res);
    }
});

router.delete("/:id",authorize, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -__v');
  //console.log(user);
  const isadmin = user.checkAdmin();
  //console.log(isadmin);
  if (isadmin){
    try {
        const  gift = await gift.findByIdAndRemove(req.params.id);
        if (! gift) throw new Error("Resource not found");
        res.send({ data:  gift });
      } catch (err) {
        sendResourceNotFound(req, res);
      }
    }else{
      sendForbidden(req, res);
    }
});

function sendResourceNotFound(req, res) {
    res.status(404).send({
      errors: [
        {
          status: "Not Found",
          code: "404",
          title: "Resource does not exist",
          description: `We could not find a course with id: ${req.params.id}`
        }
      ]
    });
  }

function sendForbidden(req, res){
  res.send({           
    errors:[               
      {
        status: 'Forbidden',                   
        code: '403',                   
        title: 'Sorry, you are not authorized.'               
      }           
    ]       
  })
}
  
  module.exports = router;