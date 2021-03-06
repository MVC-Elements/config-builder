var express = require('express');
var request = require('request');
var app = express();

//app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/public'));

//gitHub OAuth token request
app.get('/api/github/gettoken/:code', function(req, res) {
  request.post({
    uri: 'https://github.com/login/oauth/access_token',
    form: {
      client_id: 'e049784bc0cfcdf1854e',
      client_secret: '59202d31cb722d172725372eb88018652c4a0624',
      code: req.params.code
    },
    json: true
  }, function(err, httpResponse, body) {
    if (err) {
      res.send(500, { error: err });
      return;
    }
    res.send(body);
  });
});

//static content
app.all('/*', function(req, res) {
  res.sendfile('index.html', { root: __dirname + '/public' });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

module.exports = app;


