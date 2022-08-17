const express = require('express')
// import the database connection file to connect the database 
const connection = require('./connection')
connection();

const app = express();
// middleware to send post request 
app.use(express.json())

// Api to add contacts 
// get token 
app.use('/getToken',require('./Api/GetJWT'))
// add contact 
app.use('/createContact',require('./Api/CreateContact'))
// fetch details of contact 
app.use('/readContact',require('./Api/FindContact'))
// get paginated contacts 
app.use('/paginatedContacts',require('./Api/PaginatedContacts'))
// update contact 
app.use("/updateContact",require('./Api/UpdateContact'))
// delete contact 
app.use('/deleteContact',require('./Api/DeleteContact'))


// listening port 
app.listen(5000, () => {
    console.log("App listening at localhost://5000")
})