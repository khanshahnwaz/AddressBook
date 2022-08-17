
const contact=require('../Models/Contact')
const express=require('express')
const router=express.Router();

// Api to get paginated contact list 

router.get('/',async(req,res)=>{
    // extract page number and limit 
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    // set start and end index to fetch the required data
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    // initialize object to store the required result 
    const results = {}

    // check if there is need to print the next page 
    if (endIndex < await contact.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    // check if there is need to print the previous page 
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
        // fetch required data from database and store 
      results.results = await contact.find().limit(limit).skip(startIndex).exec()
     
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
    // send response with the paginated contacts 
    res.json(results)
})
module.exports=router;