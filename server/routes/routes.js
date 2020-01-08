const express = require('express');
const router     = express.Router();
const bodyParser   = require("body-parser");

const Event = require("../models/event");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


router.route('/create').post((req, res, next) => {
  Event.create(req.body,(err, data)=> {
    if(err) {
        return next(err)
    } else {
        res.json(data)
        console.log(data)
    }
  })
});

router.route("/events").post((req, res, next) => {
    Event.find(req.body, (err, data) => {
        if(err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
})

router.route("/events/:id", (req, res, next) => {
    Event.findById(req.params.id, (err, data) => {
        if(err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
})




module.exports = router