## Web原生通信技术一览 (In progress)

![data](http://userpages.uni-koblenz.de/~staab/images/tagcloud.png)


> 请爱护浏览器! 没有flash, 就没有杀害.

> use full stack JavaScript technology for easier Web Development

### Chapter 1: Client Pull (Ajax)

[`./pull`](https://github.com/abbshr/Web_Communication_Tech_Spec/tree/master/pull)

#### `XMLHTTPRequest`

### Chapter 2: Server Push (Comet)

#### `EventSource`

[`./push/comet.js`](https://github.com/abbshr/Web_Communication_Tech_Spec/tree/master/push/comet.js)

#### polling

#### long-polling

#### long-connection

##### iframe实现长连接
通过在 HTML 页面里嵌入一个隐蔵帧，然后将这个隐蔵帧的 SRC 属性设为对一个长连接的请求，服务器端就能源源不断地往客户端输入数据。

iframe 服务器端并不返回直接显示在页面的数据，而是返回对客户端 Javascript 函数的调用，如“<script type="text/javascript">js_func(“data from server ”)</script>”。服务器端将返回的数据作为客户端 JavaScript 函数的参数传递；客户端浏览器的 Javascript 引擎在收到服务器返回的 JavaScript 调用时就会去执行代码

使用 iframe 请求一个长连接有一个很明显的不足之处：IE、Morzilla Firefox 下端的进度栏都会显示加载没有完成.

[`./push/iframe.js`](https://github.com/abbshr/Web_Communication_Tech_Spec/tree/master/push/iframe.js)

### Chapter 3: Trick on CORS

#### document.domain
对于主域相同而子域不同的例子，可以通过设置`document.domain`的办法来解决。具体的做法是可以在http://www.a.com/a.html和http://script.a.com/b.html两个文件中分别加上`document.domain = 'a.com'`, 然后通过a.html文件中创建一个`iframe`，去控制`iframe.contentDocument`，这样两个js文件之间就可以"交互"了.

#### location.hash
假设域名a.com下的文件cs1.html要和cnblogs.com域名下的cs2.html传递信息，cs1.html首先创建自动创建一个隐藏的iframe，iframe的src指向cnblogs.com域名下的cs2.html页面，这时的`hash`值可以做参数传递用。cs2.html响应请求后再将通过修改cs1.html的hash值来传递数据（由于两个页面不在同一个域下IE、Chrome不允许修改`parent.location.hash`的值，所以要借助于a.com域名下的一个代理iframe:
`parent.parent.location.hash = ...`

#### window.name

[`./cors/cors.html`](https://github.com/abbshr/Web_Communication_Tech_Spec/tree/master/cors/cors.html)  
[`./cors/cors_data.html`](https://github.com/abbshr/Web_Communication_Tech_Spec/tree/master/cors/cors_data.html)  
[`./cors/cors.js`](https://github.com/abbshr/Web_Communication_Tech_Spec/tree/master/cors/cors.js)  

#### dynamic < script > tag
#### JSONP
#### XMLHTTPRequest 2

允许服务器设置响应头`Access-Control-Allow-Origin`字段, 来控制跨域资源访问.

#### Html5 postMessage

### Chapter 4: RTC

#### `WebSocket`

[WebSocket Protocol](https://github.com/abbshr/abbshr.github.io/issues/22)  
[RocketEngine](https://github.com/abbshr/RocketEngine)  

#### WebRTC

[WebRTC I](https://github.com/abbshr/abbshr.github.io/issues/41)  
[WebRTC II](https://github.com/abbshr/abbshr.github.io/issues/42)  

### Chapter 5: Trick on Data Exchange

#### plain text (UTF-8, ASCII, ...)

#### Binary encoding

##### Blob & ArrayBuffer

[Blob & ArrayBuffer以及他们的应用](https://github.com/abbshr/abbshr.github.io/issues/28)

#### media Stream

##### getUserMedia

##### RTCDataChannel

##### Audio

##### Canvas & Video
