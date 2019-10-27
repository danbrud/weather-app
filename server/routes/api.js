const express = require('express')
const axios = require('axios')
const moment = require('moment')
const City = require('../model/City')
const router = express.Router()
const xml2js = require('xml2js')

const API_KEY = '69b93809d9719d2a8aa6df489b548136'


router.get('/sanity', function (req, res) {
    res.send('OK!')
})

const createCity = (city) => {
    return {
        name: city.current.city[0].$.name,
        updatedAt: moment(city.current.lastupdate[0].$.value, "YYYY-MM-DD hh-mm").format("ddd, h:mm A"),
        temperature: city.current.temperature[0].$.value,
        condition: city.current.weather[0].$.value,
        conditionPic: city.current.weather[0].$.icon
    }
}

const requestCity = async cityName => {
    try {
        return await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}&units=metric&mode=xml`)
    }
    catch (error) {
        return false
    }
}


router.get('/city/:cityName', async function (req, res) {
    const cityName = req.params.cityName
    const response = await requestCity(cityName)

    if (!response) { return res.send("0") }


    let city = await xml2js.parseStringPromise(response.data)
    city = createCity(city)
    res.send(city)
})

router.get('/cities', function (req, res) {
    City.find({}, function (err, cities) {
        res.send(cities)
    })
})

router.post('/city', async function (req, res) {
    const city = new City(req.body)
    await city.save()

    res.send(`Saved ${city.name} as new city.`)
})

router.delete('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName

    City.deleteOne({ name: cityName }, function (err, response) {
        res.send(`Deleted ${cityName} from database`)
    })
})

router.put('/city/:cityName', async function (req, res) {
    const cityName = req.params.cityName
    const response = await requestCity(cityName)

    if (!response) { return res.send("0") }

    let city = await xml2js.parseStringPromise(response.data)
    city = new City(createCity(city))

    await City.deleteOne({ name: cityName })
    await city.save()

    res.send(city)
})


module.exports = router