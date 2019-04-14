const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String,
    updatedAt: String,
    temperature: Number,
    condition: String,
    conditionPic: String
})

const City = mongoose.model('City', citySchema)

module.exports = City