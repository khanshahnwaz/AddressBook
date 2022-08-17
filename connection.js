// connect mongodb using mongoose 
const mongoose = require('mongoose')
// connection url 
const mongooseUrl='mongodb://localhost:27017/VouchDigital'
const connection=()=>{mongoose.connect(mongooseUrl,()=>{
    console.log("Database connected successfully.")
})}
module.exports=connection;