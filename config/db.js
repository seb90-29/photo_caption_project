const Sequelize = require('sequelize')

const db = new Sequelize('photo_caption_server', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
  })

  module.exports = {
    Sequelize,
    db
  }