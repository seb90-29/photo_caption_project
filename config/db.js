const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'photo_caption_server',
  logging: console.log
})

module.exports = {
  Sequelize,
  sequelize,
}