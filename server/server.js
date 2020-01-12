const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors     = require("cors")

const eventRoute = require("./routes/routes")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())
app.use("/event", eventRoute)

const port = process.env.PORT || 5000;

mongoose.connect("mongodb://127.0.0.1:27017/events",  { useNewUrlParser: true, useUnifiedTopology: true } ).then(()=> {
  console.log("database connected!")
}).catch(()=>{
  console.log("error connecting to database")
})

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next)=> {
  if(err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})
app.listen(port, () => console.log(`Listening on port ${port}`));