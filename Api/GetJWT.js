const express = require('express')
const router = express.Router();
const user = require('../Models/User');
// import bcrypt to hash your password 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = "IamShahnwazKhan";
// method to achieve conditions 
const { body, validationResult } = require('express-validator')



// Route 1: Create a new user and send token 
router.post('/', [
    
    body('Email', 'Enter a valid email').isEmail(),
    body('Password', 'Must be of length 5').isLength(5)
], async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors})
    }
    // generate salt 
    const salt = await bcrypt.genSalt(10);
    // generate hash password to secure the data 
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);
    
    
    // create the user 
  const check= await user.create({
        
        Email: req.body.Email,
        Password: hashedPassword
    }).catch(error => res.json({ error }));
    console.log(check)
    const data = {
        user: {
            id: check.id
        }
    }
    console.log(data.user.id)

    // generate and send token 
    const token = jwt.sign(data, jwt_secret)
    res.json({token});
})
module.exports=router;
