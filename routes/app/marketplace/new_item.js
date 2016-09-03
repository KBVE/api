var yup = require('yup');
var Item = require('../../../models/item');
//Just Random Syntax Fuck your eyes

var schema = yup.object().shape({
  name: yup.string().required(),
  barcode: yup.string().required(),
  description: yup.string().required(),
  size: yup.number(),
  category: yup.string(),
  smartrating: yup.number(),
  bulk: yup.string(),
  discount: yup.number(),
  price: yup.number(),
  cost: yup.number(),
  wholesale: yup.number(),
  img_path: yup.string(),
  inventory: yup.number(),
  order_action: yup.string(),
  location: yup.string()
});

new_item.method = 'post';
new_item.path = '/app/marketplace/new_item';

function* new_item() {
  var value = this.request.body;
  try { 
    value = yield schema.validate(value); 
  } catch (e) { this.status = 400; this.body = {ok: false, data: e.errors}; return; }
  var exists = yield Item.filter(function(row) {  var barcode = value.barcode; return row('barcode').eq(barcode); });
  if (exists.length > 0) { this.status = 409; this.body = {ok: false, data: 'Barcode is taken'}; return; }
  var item = new Item(Object.assign(value, { data : '' }));
  try { 
      var created = yield item.save(); 
      this.body = created;
  } catch (e) { this.status = 500; this.body = {ok: false, data: 'Internal Error'}; return; }
}

module.exports = new_item;
