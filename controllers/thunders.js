// Import Packages
const { query } = require('express');
const express = require('express')
const router = express.Router()
    // const Thunders = require('../models/thunders')




//Create requests GET / POST
router.post('/', async(req, res, next) => {
    try {
        console.log('post request: thunders')
        let request_from_user_page = true
        if (request_from_user_page) {
            res.redirect('storms/list')
        } else {
            res.redirect('storms/:username')
        }

    } catch (err) {
        next(err)
    }
})

module.exports = router