const express=require('express')
const router=express.Router();

// import mongoose model to create a new contact 
const contact = require('../Models/Contact')

// verify user 
const verifyUser=require('../Authentication/VerifyUser')

// Api #1 Find details of a single contact 
//   /findOne

router.get('/findOne/',verifyUser,async (req,res)=>{
      
    const email=req.body.Email;
    console.log(email)
// find if the logged in user has added this contact. 
// This authentication limits user to read only his own contacts
const check=await contact.findOne({Email:email,User:req.user.id});
check?res.json(check):res.json({Error:"No contacts found."})

})

module.exports=router;