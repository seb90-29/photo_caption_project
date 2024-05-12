const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const { Sequelize, sequelize } = require('./config/db')
const routes = require('./routes/api')
module.exports = app

app.use(express.json())

app.use('/', routes)

const PORT = process.env.PORT || 3001


//test DB
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('DB error', err))

//test Connection  
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

