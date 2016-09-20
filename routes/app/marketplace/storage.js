const yup = require('yup');
const Item = require('../../../models/item');

const schema = yup.object().shape({
  name: yup.string(),
  barcode: yup.string().required(),
  inventory: yup.number(),
  location: yup.string(),
  data: yup.string()
});

storage.method = 'post';
storage.path = '/app/marketplace/storage';

function* storage() {
  const value = this.request.body;
  try { value = yield schema.validate(value); } catch (e) { this.status = 400; this.body = {ok: false, data: e.errors}; return; }
  const exists = yield Item.filter(function(row) {
    const barcode = value.barcode;
    return row('barcode').eq(barcode);
    });
  if (exists.length > 0) {
    try { 
      if(value.inventory && exists[0].inventory) { value.inventory = value.inventory + exists[0].inventory; }
      const updates = yield exists[0].merge(value).save();
      this.body = updates;
      return;
      } 
    catch (e) { this.status = 409; this.body = {ok: false, data: e.message};return;} 
  }
  else {this.status = 409; this.body = {ok: false, data: "Internal Error"}; return; }
}

module.exports = storage;
