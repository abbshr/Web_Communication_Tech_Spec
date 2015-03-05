var http = require('http');
var ref = null;
var iframe = '<iframe src="/longconnection" hidden />';
var genMsg = function () {
  return '<script>console.log(' + Math.random() + ')</script>';
};
http.createServer(function (req, res) {
  if (req.url == '/')
    return res.end(iframe);
  ref = setInterval(function () {
    res.write(genMsg());
  }, 3000);
}).on('closed', function (e) {
  clearInterval(ref);
  console.log('client disconnected');
}).listen(3000);