'use strict';

const Client = require('@go-fetch/client');
const json = require('@go-fetch/json');

new Client()
  .use(json())
  .post('http://httpbin.org/post', {msg: 'Go fetch!'})
    .then(res => res.json())
    .then(json => console.log(json))
    .then(json => console.log(json), err => console.error(err.stack))
;

