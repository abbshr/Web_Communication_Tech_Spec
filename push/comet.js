var http = require('http');
var event_stream = [
  ': this is a comment',
  '\n',
  'data: {"name": "ran", "job": "IT dev"}',
  '\n',
  'event: alive',
  'data: is alive',
  'retry: 100',
  '\n',
  'only key',
  '\n'
].join('\n');
http.createServer(function (req, res) {
  switch (req.url) {
    case '/':
      res.setHeader('content-type', 'text/html');
      res.end('eventsource test');
      break;
    default:
      res.setHeader('content-type', 'text/event-stream');
      res.end(event_stream);
  }
}).listen(3000);