const mongoose =require('mongoose')
const {Schema}=mongoose;
const userSchema=new Schema(
    {
       
        Email:{
          type:String,
          unique:true,
          required:true
        },
        Password:{
            type:String,
            required:true
            
        }
    }
)
const user=mongoose.model('user',userSchema);

// restrict duplicate entry for uniqely defined attribute 
user.createIndexes()
module.exports= user;