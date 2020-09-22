const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./config/routes')
const app = express()
const logger = require('./lib/logger')
const { port, dbURI } = require('./config/environment')
const errorHandler = require('./lib/errorHandlers')

// Middleware start

mongoose.connect(
  dbURI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo Is Connected!')
  })

app.use(express.static(`${__dirname}/frontend`))

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router)

app.use(errorHandler)

// Middleware End

app.listen(port, () => console.log(`Express listening on port ${port}`))