const sanitizeBody = require("../../middleware/sanitizeBody");
const person = require("../../models/Person");
const router = require("express").Router();
const User = require('../../models/User');
const authorize = require('../../middleware/auth');
const ResourceNotFoundError = require('../../ResourceNotFound');

router.get("/",authorize, async (req, res) => {
    const people = await person.find();
    res.send({ data: people });
});

router.post("/",authorize, sanitizeBody,  async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -__v');
  console.log(user);
  const isadmin = user.checkAdmin();
  //console.log(isadmin);
  if (isadmin){
  try {
    const newperson = new person(req.sanitizedBody);
    await newperson.save();
    res.status(201).send({ data: newperson });
  } catch (err) {
    sendResourceNotFound(err);
  }
}else{
  sendForbidden(req, res);
}
});

router.get("/:id", authorize, async (req, res) => {
    try {
        const person = await person.findById(req.params.id).populate("people");
        if (!person) throw new Error("Resource not found");
        res.send({ data: person });
      } catch (err) {
        //sendResourceNotFound(req, res);
        next();
      }
});

router.patch("/:id",authorize, sanitizeBody, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -__v');
  //console.log(user);
  const isadmin = user.checkAdmin();
  //console.log(isadmin);
  if (isadmin){
    try {
      console.log(req.sanitizedBody);
        const person = await person.findByIdAndUpdate(
          req.params.id,
          req.sanitizedBody,
          {
            new: true,
            runValidators: true
          }
        );
        if (!person) throw new Error("Resource not found");
        res.send({ data: person });
      } catch (err) {
        sendResourceNotFound(req, res);
      }
    }else{
      sendForbidden(req, res);
    }
});

router.put("/:id",authorize, sanitizeBody, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -__v');
  //console.log(user);
  const isadmin = user.checkAdmin();
  //console.log(isadmin);
  if (isadmin){
    try {
        //const { _id, ...otherAttributes } = req.body;
        const person = await person.findByIdAndUpdate(
          req.params.id,
          req.sanitizedBody,
          {
            new: true,
            overwrite: true,
            runValidators: true
          }
        );
        if (!person) throw new Error("Resource not found");
        res.send({ data: student });
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
        const person = await person.findByIdAndRemove(req.params.id);
        if (!student) throw new Error("Resource not found");
        res.send({ data: person });
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
          description: `We could not find a student with id: ${req.params.id}`
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