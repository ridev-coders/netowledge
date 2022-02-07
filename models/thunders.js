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
    freezed_skills: [{
        topic: {
            type: ObjectId,
            required: true,
            ref: 'topics'
        },
        score: {
            type: Number,
            required: true
        }
    }],
    storm: {
        type: ObjectId,
        ref: 'storms',
        required: true
    }
})