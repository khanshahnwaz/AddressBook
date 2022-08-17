const express=require('express')
const router=express.Router();

// import mongoose model to create a new contact 
const contact = require('../Models/Contact')

// verify user 
const verifyUser=require('../Authentication/VerifyUser')

// /updateContact 

router.delete('/:id',verifyUser,async(req,res)=>{
    
// check if requested contact exists or not 
const check= await contact.findById(req.params.id);
!check?res.json({Error:"Contact not found."}):null;

// now check if logged in user has added the contact
// this validation restrics user to delete unauthorized contact 

if(check.User.toString()!==req.user.id){
    res.json({Error:"Please delete your own contact."})
}
// now delete the contact 
try{
   await contact.findByIdAndDelete(req.params.id);
   res.json({Success:"Contact details Deleted."})
}catch(err){
    res.json({Error:"Internal server error."})
}
})
module.exports=router;