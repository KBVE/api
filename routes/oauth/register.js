register.method = 'post';
register.path = '/register';

function* register() {
  this.checkBody('name').isAlphanumeric('Invalid application name');
  this.checkBody('website').isURL('Invalid website url');
  this.checkBody('redirect_uri').isURL({
    protocols: ['https']
  }, 'Invalid redirect uri');
  this.body = 'hey';
};

module.exports = register;
