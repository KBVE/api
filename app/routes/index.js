exports.user = [
  require('./user/get'),
  require('./user/create'),
  require('./user/change-password')
]

exports.session = require('./session');

//exports.storage = require('./app/marketplace/storage');
//exports.barcode = require('./app/marketplace/barcode');
//exports.new_item = require('./app/marketplace/new_item');
