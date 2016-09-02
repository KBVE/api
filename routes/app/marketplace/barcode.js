var yup = require('yup');
var Item = require('../../../models/item');
var Session = require('../../../models/session');

var schema = yup.object().shape({
  barcode: yup.string().required()
});

var authSchema = yup.object().shape({
  'x-session-token': yup.string().required()
});

barcode.method = 'GET';
barcode.path = '/app/marketplace/barcode/:barcode';

barcode.middleware = function* authorized(next) {
  var value = this.request.headers;
  this.filter = true;
  try {
    value = yield authSchema.validate(value);
  } catch (e) {
    this.filter = true;
    yield next;
  }
  var exists = yield Session.filter({token: value['x-session-token']});
  this.filter = exists.length < 1;
  yield next;
};

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
