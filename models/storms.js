const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Create the results moodel
module.exports = mongoose.model('storms', {
    text: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'users',
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    ratings: [{
        topic: {
            type: String,
            // required: true,
        },
        pertinence: {
            type: Number,
            // required: true
        },
        credibility: {
            type: Number,
            // required: true
        }
    }]
})