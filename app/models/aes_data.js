const { sequelize, Sequelize } = require('../../lib/database')

module.exports = sequelize.define('aes_data', {
  username: { type: Sequelize.STRING, allowNull: true },
  aes_data: { type: Sequelize.STRING, allowNull: false },
  burn: { type: Sequelize.STRING, allowNull: false },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, { timestamps: true })
