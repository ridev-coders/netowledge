const mongoose = require('mongoose')

// Create the topics moodel
module.exports = mongoose.model('topics', {
    title: {
        type: String,
        required: true
    }
})