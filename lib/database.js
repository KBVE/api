const config = require('../config/config.json');
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
)

module.exports = { sequelize, Sequelize }
