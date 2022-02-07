// Import Packages
const { query } = require('express');
const express = require('express')
const router = express.Router()
    // const Houses = require('../models/storms')




//Create requests GET / POST
router.get('/', async(req, res, next) => {
    try {
        console.log('request: storms')
        res.render('storms/list')
    } catch (err) {
        next(err)
    }
})

router.get('/:username', async(req, res, next) => {
    try {
        console.log('request: username storms')
        res.render('storms/user')
    } catch (err) { next(err) }
})

module.exports = router