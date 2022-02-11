const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Create the users moodel
module.exports = mongoose.model('users', {
    avatar: String,
    google: String,
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: function() { return this.google ? false : true }
    },
    born: {
        type: Date,
        // required: true
    },
    country: {
        type: String,
        // required: true
    },
    skills: [{
        topic: {
            type: String,
        },
        score: {
            type: Number,
            // required: true
        }
    }]
})