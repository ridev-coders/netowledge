const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Create the thunders moodel
module.exports = mongoose.model('thunders', {
    author: {
        type: ObjectId,
        ref: 'users',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    trust_rate: {
        type: Number,
        required: true
    },
    freezed_skills: {

    },
    storm: {
        type: ObjectId,
        ref: 'storms',
        required: true
    }

})