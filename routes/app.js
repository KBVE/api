var app = function* app() {
  this.body = {
    ok: true,
    data: 'KBVE API'
  };
};

app.method = 'GET';
app.path = '/';

module.exports = app;
