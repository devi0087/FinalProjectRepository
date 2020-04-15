const debug = require('debug')('week8:auth')
const User = require('../../models/User')
const sanitizeBody = require('../../middleware/sanitizeBody')
const express = require('express')
const router = express.Router()

// Register a new user
router.post('/users', sanitizeBody, async (req, res) => {
  try {
    let newUser = new User(req.sanitizedBody)
    const itExists = !!(await User.countDocuments({ email: newUser.email }))
    if (itExists) {
      return res.status(400).send({
        errors: [
          {
            status: 'Bad Request',
            code: '400',
            title: 'Validation Error',
            detail: `Email address '${newUser.email}' is already registered.`,
            source: { pointer: '/data/attributes/email' }
          }
        ]
      })
    }
    await newUser.save()
    res.status(201).send({ data: newUser })
  } catch (err) {
    debug('Error saving new user: ', err.message)
    res.status(500).send({
      errors: [
        {
          status: 'Server error',
          code: '500',
          title: 'Problem saving document to the database.'
        }
      ]
    })
  }
})

// Login a user and return an authentication token.
router.post('/tokens', sanitizeBody, async (req, res) => {
  const { email, password } = req.sanitizedBody
  try {
    const user = await User.authenticate(email, password)
    if (!user) {
      return res.status(401).send({
        errors: [
          {
            status: 'Unauthorized',
            code: '401',
            title: 'Authentication failed',
            description: 'Incorrect username or password.'
          }
        ]
      })
    }
    res.status(201).send({ data: { token: user.generateAuthToken() } })
  } catch (err) {
    debug(`Error authenticating user ... `, err.message)
    res.status(500).send({
      errors: [
        {
          status: 'Server error',
          code: '500',
          title: 'Problem saving document to the database.'
        }
      ]
    })
  }
})
router.get('/users/me', async (req, res) => {
  // Get the JWT from the request header
  // Validate the JWT
  // Load the User document from the database using the `_id` in the JWT
  // Remember to redact sensitive data like the user's password
  // Send the data back to the client.
  const user = await User.findById(req.user._id).select('-password -__v');
  console.log(user);
  const isadmin = user.checkAdmin();
  console.log(isadmin);
  res.send({ data: user });
});
router.patch('/users/me', sanitizeBody, async(req, res)=>{
  
  const user = await User.findById(req.user.id).select('-password-_v');
  console.log(user);
  try{
    const {_id, ...otherAttributes} = req.body;
    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      req.sanitizedBody,
      {
        new: true,
        runValidators: true
    }
    );

    updateUser.password = await bcrypt.hash(updateUser.password, saltRounds);
    
    await updateUser.save();
    res.send({data: updateUser});
  } catch (err){
    console.log('error');
    sendResourceNotFound(req, res);
  }});

module.exports = router