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
    topics: {
        type: ObjectId,
        ref: 'topics'
    }
})