const mongoose = require("mongoose")

const Schema = mongoose.Schema

var id = mongoose.Types.ObjectId;

const events = new Schema({
    title: String,
    color: String,
    date: String,
    time: String,
    event:{type: id, ref: "event"}
})

const Event = mongoose.model("Event", events)

module.exports = Event