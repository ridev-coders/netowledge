// Import Packages
const { query } = require('express');
const express = require('express')
const router = express.Router()
    // const getTopics = require('../services/ml').getTopics
const ml = require('../services/ml')
const Storms = require('../models/storms')


//Create requests GET / POST
router.get('/', async(req, res, next) => {
    try {
        console.log('get request: storms')
        console.log('logged user is: ', req.user)
        console.log('looking for storms...')
        let storms = await Storms.find().populate('author').sort({ "create_date": -1 })
            // render the page
        res.render('storms/list', { user: req.user, storms })
    } catch (err) {
        next(err)
    }
})

router.get('/:username', async(req, res, next) => {
    try {
        console.log('get request: username storms')
        res.render('storms/user')
    } catch (err) { next(err) }
})


router.post('/create', async(req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
            res.redirect('auth/login')
        } else {
            console.log('post request: create storm')
            let request_from_user_page = false
            if (request_from_user_page) {
                console.log('user request from user storms page')
                res.redirect('storms/:username')
            } else {
                console.log('user request from storms page')


                req.body.author = req.user._id
                let storm = await Storms.create(req.body)
                if (storm) {
                    console.log('storm created')
                    console.log('id: ', storm._id)
                        // test topic function
                    let topics = ml.getTopics(storm.text)
                    console.log(topics)
                    res.redirect('/')
                }

            }
        }
    } catch (err) { next(err) }
})


router.delete('/:id', async(req, res, next) => {
    try {
        console.log('delete request: delete storm')
        res.render('storms/user')
    } catch (err) { next(err) }
})

router.patch('/:id', async(req, res, next) => {
    try {
        console.log('patch request: patch storm')
        res.render('storms/user')
    } catch (err) { next(err) }
})

module.exports = router