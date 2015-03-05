## Web原生通信技术一览 (In progress)

![data](http://userpages.uni-koblenz.de/~staab/images/tagcloud.png)


> 请爱护浏览器! 没有flash, 就没有杀害.

> use full stack JavaScript technology for easier Web Development

### Chapter 1: Client Pull (Ajax)

[`./pull`](https://github.com/abbshr/Web_Communication_Tech_Spec/pull)

#### `XMLHTTPRequest`

#### JSON-RPC

### Chapter 2: Server Push (Comet)

#### `EventSource`

[`./push/comet.js`](https://github.com/abbshr/Web_Communication_Tech_Spec/push/comet.js)

#### polling

#### long-polling

#### long-connection

[`./push/iframe.js`](https://github.com/abbshr/Web_Communication_Tech_Spec/push/iframe.js)

### Chapter 3: Trick on CORS

#### document.domain
#### location.hash
#### window.name

[`./cors/cors.html`](https://github.com/abbshr/Web_Communication_Tech_Spec/cors/cors.html)
[`./cors/cors_data.html`](https://github.com/abbshr/Web_Communication_Tech_Spec/cors/cors_data.html)
[`./cors/cors.js`](https://github.com/abbshr/Web_Communication_Tech_Spec/cors/cors.js)

#### dynamic \<script\> tag
#### JSONP
#### XMLHTTPRequest 2

`Access-Control-Allow-Origin: *`

#### Html5 postMessage

### Chapter 4: RTC

#### `WebSocket`

[WebSocket Protocol](https://github.com/abbshr/abbshr.github.io/issues/22)
[RocketEngine](https://github.com/abbshr/RocketEngine)

#### WebRTC

[WebRTC I](https://github.com/abbshr/abbshr.github.io/issues/41)

### Chapter 5: Trick on Data Exchange

#### plain text (UTF-8, ASCII, ...)

#### Binary encoding

#### media Stream
