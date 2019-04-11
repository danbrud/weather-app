const express = require('express')
const request = require('request')
const City = require('../model/City')
const router = express.Router()

const API_KEY = 'a8e94a6bf523415098180947191104'


router.get('/sanity', function (req, res) {
    res.send('OK!')
})


router.get('/weather/:city', function(req, res) {
    let city = req.params.city
    request(`https://api.apixu.com/v1/current.json?key=${API_KEY}&q=${city}`, function(err, response) {
        let currentWeatherObj = JSON.parse(response.body)
        res.send(currentWeatherObj)
    })
})


module.exports = router