const express = require('express');
const router     = express.Router();
const bodyParser   = require("body-parser");

const Event = require("../models/event");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.route("/").get((req, res, nest) => {
    Event.find((err, data) => {
        if(err) {
            console.log(err)
        } else {
            res.json(data)
        }
    })
})


router.route('/create').post((req, res, next) => {
    Event.create(req.body,(err, data)=> {
      if(err) {
          return next(err)
      } else {
          res.json(data)
      }
    })
  });

router.route("/:id").get((req, res, next) => {
    Event.findById(req.params.id, (err, data) => {
        if(err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
})

router.route("/:id/update").put((req, res, next) => {
    Event.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if(err) {
            return next(err)
        } else {
            res.json()
            console.log("Event updated!")
        }
    })
})


router.route("/:id/delete").delete((req, res, next) => {
    Event.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
})


module.exports = router