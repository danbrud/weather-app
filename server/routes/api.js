const express = require('express')
const request = require('request')
const City = require('../model/City')
const router = express.Router()

const API_KEY = 'a8e94a6bf523415098180947191104'


router.get('/sanity', function (req, res) {
    res.send('OK!')
})


router.get('/city/:cityName', function(req, res) {

    //ROUTE THAT MAKES CALLS TO API

    let cityName = req.params.cityName
    request(`https://api.apixu.com/v1/current.json?key=${API_KEY}&q=${cityName}`, function(err, response) {
        let currentWeatherObj = JSON.parse(response.body)
        res.send(currentWeatherObj)
    })
})

router.get('/cities', function(req, res) {
    //ROUTE THAT SAVES ALL CITY DATA SAVED IN DB AND SENDS IT TO CLIENT
})

router.post('/city', function(req, res) {
    //TAKE DATA FROM BODY OF THE REQUEST AND SAVE AS A NEW CITY TO DATABASE
    let reqCity = req.body

    let newCity = new City({
        name: reqCity.name,
        updatedAt: reqCity.updatedAt,
        temperature: reqCity.temperature,
        condition: reqCity.condition,
        conditionPic: reqCity.conditionPic
    })

    let save = newCity.save()
    save.then(function(city) {
        res.send(`Saved ${city.name} as new city.`)
    })
})

router.delete('/city/:cityName', function(req, res) {
    //FIND CITY DATA IN DB AND REMOVE IT FROM DB
})


module.exports = router