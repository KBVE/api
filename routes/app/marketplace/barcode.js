var yup = require('yup');
var Item = require('../../../models/item');

var schema = yup.object().shape({
  barcode: yup.string().required()
});

barcode.method = 'GET';
barcode.path = '/app/marketplace/barcode/:barcode';

function* barcode() {
 var value = this.params;
  try { value = yield schema.validate(value); } catch (e) { this.status = 400; this.body = {ok: false, data: e.errors}; return; }
  try {
    var data = yield Item.filter(value);
    if (!data.length) { this.status = 404; this.body = {ok: false, data: 'Barcode not found'}; return; }
    this.body = data[0];
    } catch(e)  { this.status = 400;this.body = {ok: false, data: e.errors};return; }
}

module.exports = barcode;
