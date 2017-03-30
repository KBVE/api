const { sequelize, Sequelize } = require('../../lib/database');

module.exports = sequelize.define('session', {
  user_id: { type: Sequelize.STRING },
  token: { type: Sequelize.STRING(32) },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, { timestamps: true })
