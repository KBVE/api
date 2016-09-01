var database = require('../database');
var type = database.type;

module.exports = database.createModel("item", {
  name: type.string().required(),
  barcode: type.string(),
  description: type.string().required(),
  size: type.number(),
  category: type.string(),
  smartrating: type.number(),
  bulk: type.string(),
  discount: type.number(),
  price: type.number(),
  cost: type.number(),
  wholesale: type.number(),
  img_path: type.string(),
  inventory: type.number(),
  order_action: type.string(),
  data: type.string(),
  created: type.date().default(database.r.now())
});
