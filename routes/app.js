var app = function* app() {
  this.body = {
    ok: true,
    data: 'API v1'
  };
};

app.method = 'GET';
app.path = '/';

module.exports = app;
