var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  res.setHeader('content-type', 'text/html');
  fs.createReadStream('cors_data.html').pipe(res);
}).listen(3000);