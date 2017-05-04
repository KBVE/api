const { sequelize, Sequelize } = require('../../lib/database')

module.exports = sequelize.define('item', {
  name: { type: Sequelize.STRING },
  location: { type: Sequelize.STRING },
  barcode: { type: Sequelize.STRING, unique: true, primary: true },
  description: { type: Sequelize.TEXT },
  size: { type: Sequelize.INTEGER }, // what is this? dimensions?
  category_id: { type: Sequelize.INTEGER },
  smartrating: { type: Sequelize.FLOAT },
  bulk: { type: Sequelize.BOOLEAN }, // what is this?
  discount: { type: Sequelize.DOUBLE },
  price: { type: Sequelize.DOUBLE },
  // cost: { type: Sequelize.DOUBLE }, why?
  wholesale: { type: Sequelize.DOUBLE },
  img_path: { type: Sequelize.STRING },
  inventory: { type: Sequelize.INTEGER },
  order_action: { type: Sequelize.STRING },
  data: { type: Sequelize.STRING }, // what is this?,
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, { timestamps: true, paranoid: true })
