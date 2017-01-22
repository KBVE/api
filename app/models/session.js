const { sequelize, Sequelize } = require('../../lib/database');

module.exports = sequelize.define('session', {
  user_id: { type: Sequelize.STRING },
  token: { type: Sequelize.STRING(16) },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, { timestamps: true })
