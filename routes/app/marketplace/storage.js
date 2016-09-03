var yup = require('yup');
var Item = require('../../../models/item');

var schema = yup.object().shape({
  name: yup.string(),
  barcode: yup.string().required(),
  inventory: yup.number(),
  location: yup.string(),
  data: yup.string()
});

storage.method = 'post';
storage.path = '/app/marketplace/storage';

function* storage() {
  var value = this.request.body;
  try { value = yield schema.validate(value); } catch (e) { this.status = 400; this.body = {ok: false, data: e.errors}; return; }
  var exists = yield Item.filter(function(row) {
    var barcode = value.barcode;
    return row('barcode').eq(barcode);
    });
  if (exists.length > 0) {
    try { 
      if(value.inventory && exists[0].inventory) { value.inventory = value.inventory + exists[0].inventory; }
      var updates = yield exists[0].merge(value).save();
      this.body = updates;
      return;
      } 
    catch (e) { this.status = 409; this.body = {ok: false, data: e.message};return;} 
  }
  else {this.status = 409; this.body = {ok: false, data: "Internal Error"}; return; }
}

module.exports = storage;
