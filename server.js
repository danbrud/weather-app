const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const City = require('./server/model/City')

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/weatherDB", { useNewUrlParser: true })


const app = express()
const api = require('./server/routes/api')


app.use(express.static(path.join(__dirname, '/dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', api)



const port = 3100
app.listen(process.env.PORT || port, function () {
    console.log('Server is up and running on port ' + port)
})