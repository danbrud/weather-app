const express = require('express')
const request = require('request')
const moment = require('moment')
const City = require('../model/City')
const router = express.Router()

const API_KEY = 'a8e94a6bf523415098180947191104'


router.get('/sanity', function (req, res) {
    res.send('OK!')
})


router.get('/city/:cityName', function (req, res) {

    //ROUTE THAT MAKES CALLS TO API

    let cityName = req.params.cityName
    request(`https://api.apixu.com/v1/current.json?key=${API_KEY}&q=${cityName}`, function (err, response) {
        let weatherObj = JSON.parse(response.body)

        if (weatherObj.error) {
            return res.end()
        } else {
            let lastUpdate = moment(weatherObj.current.last_updated, "YYYY-MM-DD hh-mm").format("ddd, h:mm A")

            let cityObj = {
                name: weatherObj.location.name,
                updatedAt: lastUpdate,
                temperature: weatherObj.current.temp_c,
                condition: weatherObj.current.condition.text,
                conditionPic: weatherObj.current.condition.icon
            }

            res.send(cityObj)
        }

    })
})

router.get('/cities', function (req, res) {
    //ROUTE THAT FINDS ALL CITY DATA SAVED IN DB AND SENDS IT TO CLIENT
    City.find({}, function (err, cities) {
        res.send(cities)
    })
})

router.post('/city', function (req, res) {
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
    save.then(function (city) {
        res.send(`Saved ${city.name} as new city.`)
    })
})

router.delete('/city/:cityName', function (req, res) {
    //FIND CITY DATA IN DB AND REMOVE IT FROM DB
    let cityName = req.params.cityName
    City.deleteOne({ name: cityName }, function (err, response) {
        res.send(`Deleted ${cityName} from database`)
    })
})

router.put('/city/:cityName', async function (req, res) {
    let cityName = req.params.cityName

    request(`https://api.apixu.com/v1/current.json?key=${API_KEY}&q=${cityName}`, async function (err, response) {
        let weatherObj = JSON.parse(response.body)
        let lastUpdate = moment(weatherObj.current.last_updated, "YYYY-MM-DD hh-mm").format("ddd, h:mm A")

        let newCity = new City({
            name: weatherObj.location.name,
            updatedAt: lastUpdate,
            temperature: weatherObj.current.temp_c,
            condition: weatherObj.current.condition.text,
            conditionPic: weatherObj.current.condition.icon
        })

        await City.deleteOne({ name: cityName })
        await newCity.save()

        res.send(newCity)

    })
})


module.exports = router