const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Create the users moodel
module.exports = mongoose.model('users', {
    avatar: String,
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
        required: true
    },
    born: {
        type: Date,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    skills: [{
        topic: {
            type: ObjectId,
            required: true,
            ref: 'topics'
        },
        score: {
            type: Number,
            required: true
        }
    }]
})