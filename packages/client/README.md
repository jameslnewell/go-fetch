# @go-fetch/client

[![Build Status](https://travis-ci.org/go-fetch-js/go-fetch.svg?branch=master)](https://travis-ci.org/go-fetch-js/go-fetch)

A pluggable HTTP client for NodeJS and the browser.

`go-fetch` boasts a simple API but supports many features through plugins.

**Features:**

- Support for `HTTP` and `HTTPS` protocols
- Support for streaming
- Pluggable API with plugins for:
    - following redirects
    - compression
    - authentication
    - working with JSON
    - ...and lots more

## Installation

    npm install --save @go-fetch/client

## Usage
    
### GET
    
```javascript

const Client = require('@go-fetch/client');
const json = require('@go-fetch/json');

new Client()
  .use(json())
  .get('http://httpbin.org/get')
    .then(res => res.json())
    .then(json => console.log(json), err => console.error(err.stack))
;

```

### POST

```javascript

const Client = require('@go-fetch/client');
const json = require('@go-fetch/json');

new Client()
  .use(json())
  .post('http://httpbin.org/post', {msg: 'Go fetch!'})
    .then(res => res.json())
    .then(json => console.log(json))
    .then(json => console.log(json), err => console.error(err.stack))
;

```

## API

### Client

A HTTP client.


```
new Client()
```

Create a new `HTTP` client.

```
.use(plugin : function) : Client
```

Extend the functionality with a plugin.

**Parameters:**

- `plugin` Required. A plugin function.

**Returns:**

The client.

```
.get(url : string, [headers : object]) : Promise
```

Send a `HTTP` `GET` request.

**Parameters:**

- `url` Required. The request URL.
- `headers` Optional. The request headers. An object containing key-value pairs.

**Returns:**

A `Promise`. Resolves with a `Response`. Rejects with an `Error`.

```
.post(url : string, [headers : object], [body : *]) : Promise
```

Send a `HTTP` `POST` request.

**Parameters:**

- `url` Required. The request URL.
- `headers` Optional. The request headers. An object containing key-value pairs.
- `body` Optional. The request body. May be a string or a stream.

**Returns:**

A `Promise`. Resolves with a `Response`. Rejects with an `Error`.

```
.put(url : string, [headers : object], [body : *]) : Promise
```

Send a `HTTP` `PUT` request.

**Parameters:**

- `url` Required. The request URL.
- `headers` Optional. The request headers. An object containing key-value pairs.
- `body` Optional. The request body. May be a string or a stream.

**Returns:**

A `Promise`. Resolves with a `Response`. Rejects with an `Error`.

```
.delete(url : string, [headers : object]) : Promise
```

Send a `HTTP` `DELETE` request.

**Parameters:**

- `url` Required. The request URL.
- `headers` Optional. The request headers. An object containing key-value pairs.

**Returns:**

A `Promise`. Resolves with a `Response`. Rejects with an `Error`.

```
.request(method : string, url : string, [headers : object], [body : *]) : Promise
```

Send a `HTTP` request.

**Parameters:**

- `method` Required. The request method.
- `url` Required. The request URL.
- `headers` Optional. The request headers. An object containing key-value pairs.
- `body` Optional. The request body. May be a string or a stream.

**Returns:**

A `Promise`. Resolves with a `Response`. Rejects with an `Error`.

```
.before(middleware : function) : Client
```

Extend the functionality with a middleware function which is run before a request is sent.

**Parameters:**

- `middleware` Required. A middleware function.

**Returns:**

The client.

```
.after(middleware : function) : Client
```

Extend the functionality with a middleware function which is run after a request is sent.

**Parameters:**

- `middleware` Required. A middleware function.

**Returns:**

The client.

### Request

A HTTP request.

```
new Request([options : object])
```

Create a new request.

**Options:**

- `method` Required. The request method.
- `url` Required. The request URL.
- `headers` Optional. The request headers. An object containing key-value pairs.
- `body` Optional. The request body. May be a string or a stream.

```
.method : string
```

The request method.

```
.url : string
```

The request URL.

```
.headers : object
```

The request headers. An object containing key-value pairs.

```
.body : *
```

The request body. May be a string or a stream.

### Response

A HTTP response.

```
new Response([options : object])
```

Create a new request.

**Options:**

- `status` Required. The request method.
- `url` Required. The request URL.
- `headers` Optional. The request headers. An object containing key-value pairs.
- `body` Optional. The request body. May be a string or a stream.

```
.status : number
```

The response stats.

```
.reason : string
```

The response reason.

```
.headers : object
```

The response headers. An object containing key-value pairs.

```
.body : *
```

The response body. May be a string or a stream. Usually a stream.

```
.text(encoding : string) : Promise
```

Read the response body into a string.

**Returns:**

A `Promise`. Resolves with a `string`. Rejects with an `Error`.


## Plugins and Middleware

Plugin functions are simple functions that take a client instance and do something with it. Plugin functions are called when they are `.use()`d.

Middleware functions are simple functions that take a `Request` or `Response` object and a `next()` callback as parameters, and does something with them. e.g. add helper methods to the `Request` or `Response` objects, modify the headers or body sent or retreived from the server.

### Example

Here's an example plugin that adds a `.error()` method to the `Response` for asserting whether an error occurred with the request.

```javascript
function plugin(client) {
  client.after((res, next) => {
    res.error = () => this.status >= 400 && this.status < 600;
    next(null, res);
  });
}
````

## Plugins

- `@go-fetch/auth`
- `@go-fetch/useragent`

## Change log

### v3.1.0

- add: middleware can short-circuit the request to return a staged response
- break: middleware can no longer be synchronous, they must call `next()` - don't think anyone else will be using sync (its a bit ambiguous) but the tests were

### v3.0.0

Almost a total rewrite.

- break: use promises instead of events and callbacks
- break: use middleware instead of events for plugins
- break: use simplified `Request` and `Response` objects

### v2.0.0

 - moved `prefixUrl`, `contentType` and `body` plugins into their own repositories
 - changed the arguments passed to the `before` and `after` event handlers - handlers now receive a formal event object that allows propagation to be stopped and the request to be prevented
 - adding some tests
 - cleaning up documentation

## To do

- Moar tests
- Plugins:
    - Cookie Jar
- Support for XMLHttpRequest/fetch in the browser

## License

The MIT License (MIT)

Copyright (c) 2016 James Newell