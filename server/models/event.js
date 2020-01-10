const mongoose = require("mongoose")

const Schema = mongoose.Schema

const events = new Schema({
    title: String,
    color: String,
    date: String
})

const Event = mongoose.model("Event", events)

module.exports = Event