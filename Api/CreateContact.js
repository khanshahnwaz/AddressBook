const express = require('express')
const router = express.Router();
// to apply restrictions 
const { body, validationResult } = require('express-validator')
// import mongoose model to create a new contact 
const contact = require('../Models/Contact')

// verify user 
const verifyUser = require('../Authentication/VerifyUser')
//   Api #1  /create
// Endpoint to create a new contact 
router.post('/createOne', verifyUser, [
    // imposing validations to each field 
    body('Name', 'Should containt at least 5 chars.').isLength({ min: 5 }),
    body('Email', 'Invalid email format.').isEmail(),
    body('Phone', 'Should be number of 10 digits.').isNumeric().isLength(10),
    body('Address', 'Should contain atleast 15 characters.').isLength({ min: 15 })
], async (req, res) => {
    // console.log(req)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        res.send(errors.array())
    }
    // check if this contact already exists or not 
    const check = await contact.findOne({
        Email: req.body.Email

    });
    if (check) {
        res.json({ error: "Duplicate contact found.." })
    }
    //   now create a new contact 
    console.log(req.user.id)
    const data = {
        User: req.user.id,
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Address: req.body.Address
    }

    const result = await contact.create(data).catch(err = () => {
        res.json(err)
    })
    if (result) { res.json({ Sucess: "Contact added." }) }



})


// Api #2 Add bulk contacts 
//    /createMany
router.post('/createMany', verifyUser, [
    //    validate all the contacts 
    body('Contacts.*.Name', 'Should containt at least 5 chars.').isLength({ min: 5 }),
    body('Contacts.*.Email', 'Invalid email format.').isEmail(),
    body('Contacts.*.Phone', 'Should be number of 10 digits.').isNumeric().isLength(10),
    body('Contacts.*.Address', 'Should contain atleast 15 characters.').isLength({ min: 15 })
], async (req, res) => {
    // try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send(errors)
    }
    // check if any duplicate email 
    const details = req.body.Contacts;
    let flag = false;
    let check = await details.map(async (i) => {
        // find if an email already exists.
        console.log("email", i.Email)
        const em = await contact.findOne({ Email: i.Email })
        // if any duplicate email found.Send error
        em ? res.json({ Error: "Email already exists." }) : null

    })
    // iterate to all the contacts and add User 
    await details.forEach(element => {
        element.User = req.user.id
    });
    console.log("Details are", details)

    // create contacts only if no duplicate email found.
    try {
        await contact.insertMany(details);
        res.json({ Success: "Contacts added in the database." })
    } catch (e) {
        res.json({ Error: "Internal server error." })
    }

})
module.exports = router;