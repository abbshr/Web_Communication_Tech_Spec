## Web原生通信技术一览 (In progress)

![data](http://userpages.uni-koblenz.de/~staab/images/tagcloud.png)


> 请爱护浏览器! No Flash, No Hurt.

> use full stack JavaScript technology for easier Web Development

### Chapter 1: Client Pull (Ajax)

[`./pull`](https://github.com/abbshr/Web_Communication_Tech_Spec/tree/master/pull)

#### `XMLHTTPRequest`

#### `fetch`
这是一个让开发者激动的新标准规范API, 为何这么说?

在不丧失功能的基础上变得易用, 就是这样. 想想Promise + jQuery Syntax. yeah! that's right.

fetch是用来做什么的?

>  fetch is an easier way to make web requests and handle responses than using an XMLHttpRequest

就是说fetch是用来取代XMLHTTPRequest的全新API, 这个[页面](https://fetch.spec.whatwg.org/)对其进行了详细说明.

来瞧瞧fetch的用法:

```coffee
# in coffee
fetch '/getjsondata'
.then (res) ->
	res.json() if res.ok
.then (json) ->
	console.log json
.catch (err) ->
	console.error err.message
```

放眼望去全是Promise哈, 赏心悦目. fetch会返回一个Promise对象, 他的第一个resolve函数的参数是Response对象的实例, 代表一个原始的响应流, 其上可以继续调用如`.json()`,`.text()`,`.blob()`等方法读取response流并继续返回一个新的promise.

fetch支持第二个参数, 是一个配置对象, 包括method, headers, body等, 比如构造一个表单上传请求:

```coffee
fetch '/formupload',
	method: 'POST'
	body: new FormData document.querySelector '#form'
.then (res) ->
	#...
```

唯一一点不同于XMLHTTPRequest的是隐私策略, fetch默认禁止发送浏览器中保存的隐私数据, 如cookies. 这时需要session的应用就该在fetch调用中增加一个`credentials: 'same-origin'`:

```coffee
fetch '/need4session', credentials: 'same-origin'
```

这样就可以在请求中附带cookies数据了.

但要说现在广泛使用fetch有点为时过早了, 毕竟各大浏览器厂商对fetch的支持情况很不乐观. 为此github发布了一个polyfill项目[fetch](https://github.com/github/fetch)用以兼容现有的浏览器.

fetch的更底层支持也是暴露给开发者的: 代表请求的`Request`对象, 代表响应的`Response`对象, 以及代表HTTP请求头的`Header`对象. 在Chapter 6的Stream一章将会提到他们.


#### `beacon`
你可能注意到了浏览器在关闭标签时无法完整发送HTTP请求, 也就是`"unload"`事件上没法做异步请求, 会被浏览器忽略掉. 然而同步请求会在一定程度上影响用户的体验.

为弥补这个不足, W3C小组规定了这个API. 使用起来很简单: `navigator.sendBeacon(url, data);`. 这个调用会将请求入队, 再由浏览器的另外线程向服务器发送**POST**请求, 因而不会影响当前页面的关闭, 由于允许了async, 当然请求也会被完整发送了.

`sendBeacon()`的返回值是一个Boolean, 当返回`true`时, 意味着浏览器已经**成功将该请求缓存起来等待处理**, 而不是已经成功发送HTTP请求, 准确来说请求是在unload事件触发后被发送的.

详见[W3C Beacon spec](http://www.w3.org/TR/beacon/#sec-beacon)

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
对于主域相同而子域不同的例子，可以通过设置`document.domain`的办法来解决。具体的做法是可以在`http://www.a.com/a.html`和`http://script.a.com/b.html`两个文件中分别加上`document.domain = 'a.com'`, 然后通过a.html文件中创建一个`iframe`，去控制`iframe.contentDocument`，这样两个js文件之间就可以"交互"了.

#### location.hash
假设域名a.com下的文件cs1.html要和cnblogs.com域名下的cs2.html传递信息，cs1.html首先创建自动创建一个隐藏的iframe，iframe的src指向cnblogs.com域名下的cs2.html页面，这时的`hash`值可以做参数传递用。cs2.html响应请求后再将通过修改cs1.html的hash值来传递数据（由于两个页面不在同一个域下IE、Chrome不允许修改`parent.location.hash`的值，所以要借助于a.com域名下的一个代理iframe:
`parent.parent.location.hash = ...`

#### window.name

[`./cors/cors.html`](https://github.com/abbshr/Web_Communication_Tech_Spec/tree/master/cors/cors.html)  
[`./cors/cors_data.html`](https://github.com/abbshr/Web_Communication_Tech_Spec/tree/master/cors/cors_data.html)  
[`./cors/cors.js`](https://github.com/abbshr/Web_Communication_Tech_Spec/tree/master/cors/cors.js)  

#### dynamic < script > tag
#### JSONP
#### XMLHTTPRequest 2 specifications
#### fetch CORS

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

### Chapter 6: underlying Stream in Browser

这部分描述的是非常偏底层I/O的浏览器API, 并且Chrome中也尚未全部公开. 但基于这些底层API已经实现了更具普遍意义的功能，比如`fetch`, `Response`,`Request`等.

> More generally, the platform is full of streaming abstractions waiting to be expressed as streams: multimedia streams, file streams, interprocess communication, and more benefit from being able to process data incrementally instead of buffering it all into memory and processing it in one go. By providing the foundation for these streams to be exposed to developers, the Streams Standard enables use cases like:

> + Video effects: piping a readable video stream through a transform stream that applies effects in real time.

> + Decompression: piping a file stream through a transform stream that selectively decompresses files from a .tgz archive, turning them into img elements as the user scrolls through an image gallery.

> + Image decoding: piping a HTTP response stream through a transform stream that decodes bytes into bitmap data, and then through another transform that translates bitmaps into PNGs. If installed inside the fetch hook of a service worker, this would allow developers to transparently polyfill new image formats.


详见：[Stream Spec](https://streams.spec.whatwg.org/)
