const { sequelize, Sequelize } = require('../../lib/database')

module.exports = sequelize.define('users', {
  username: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  pgp_public_key: { type: Sequelize.STRING },
  kbve_private_key: { type: Sequelize.STRING },
  kbve_public_key: { type: Sequelize.STRING },
  minecraft_uuid: { type: Sequelize.UUID },
  bitcoin_address: { type: Sequelize.STRING },
  ether_address: { type: Sequelize.STRING },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, { timestamps: true })
