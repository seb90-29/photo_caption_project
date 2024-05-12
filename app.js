const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const { Sequelize, db } = require('./config/db')

module.exports = app

const PORT = process.env.PORT || 3001


//test DB
db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('DB error', err))

//test Connection  
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

