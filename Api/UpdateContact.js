const express=require('express')
const router=express.Router();

// import mongoose model to create a new contact 
const contact = require('../Models/Contact')

// verify user 
const verifyUser=require('../Authentication/VerifyUser')

// /updateContact 

router.put('/:id',verifyUser,async(req,res)=>{
    const {Name,Email,Phone,Address}=req.body;
    //  initialize an object to store the updated data 
    const newContact={}
    Name?newContact.Name=Name:null
    Email?newContact.Email=Email:null
    Phone?newContact.Phone=Phone:null
    Address?newContact.Address=Address:null
    // console.log(newContact)
// check if requested contact exists or not 
const check= await contact.findById(req.params.id);
!check?res.json({Error:"Contact not found."}):null;

// now check if logged in user has added the contact
// this validation restrics user to update unauthorized contact 
console.log("req",check.User.toString())
console.log("oriignal",req.user.id)
if(check.User.toString()!==req.user.id){
    res.json({Error:"Please update your own contact."})
}
// now update the contact 
try{
   await contact.findByIdAndUpdate(req.params.id,{$set:newContact},{new:true});
   res.json({Success:"Contact details updated."})
}catch(err){
    res.json({Error:"Internal server error."})
}
})
module.exports=router;