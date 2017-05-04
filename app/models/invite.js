const { sequelize, Sequelize } = require('../../lib/database')

module.exports = sequelize.define('invite', {
  username: { type: Sequelize.STRING, allowNull: true },
  invite_hash: { type: Sequelize.STRING, allowNull: false },
  expire: { type: Sequelize.DATE, allowNull: false },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, { timestamps: true })
