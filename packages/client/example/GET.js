'use strict';

const Client = require('@go-fetch/client');
const json = require('@go-fetch/json');

new Client()
  .use(json())
  .get('http://httpbin.org/get')
    .then(res => res.json())
    .then(json => console.log(json), err => console.error(err.stack))
;
