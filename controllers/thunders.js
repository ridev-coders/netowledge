// Import Packages
const { query } = require('express');
const express = require('express')
const router = express.Router()
const Thunders = require('../models/thunders')
const Storms = require('../models/storms')




//Create requests GET / POST
router.post('/create', async(req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
            res.redirect('auth/login')
        } else {
            console.log('\npost request: thunderize (Create a thunder)')
            //to create a thunder the model neeeds:
            // author, comment, trust_rate, freezed_skills, storm
            req.body.author = req.user
            // comment is already inside the req
            // trust_rate is already inside the req
            req.body.freezed_skills = req.user.skills
            console.log('req: ', req.body)
            let thunder = await Thunders.create(req.body)
            if (thunder) {
                console.log('thunder created')
                console.log('id: ', thunder._id)
                // redirect:
                let request_from_user_page = false
                if (!request_from_user_page) {
                    res.redirect('/')
                } else {
                    res.redirect('storms/:username')
                }
            }

        }

    } catch (err) {
        next(err)
    }
})

module.exports = router