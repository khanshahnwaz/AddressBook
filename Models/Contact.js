const mongoose = require('mongoose')

const Create = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        Name: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true,
            unique: true
        },
        Phone: {
            type: Number,
            required: true
        },
        Address: {
            type: String,
            required: true
        }
    }
)
const contact = mongoose.model('contact', Create)
// restrict duplicate entry for uniqely defined attribute 
contact.createIndexes()
module.exports = contact