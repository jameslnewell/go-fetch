'use strict';

const Client = require('@go-fetch/client');
const useragent  = require('..');

new Client()
  .use(useragent('go-fetch'))
  .get('https://api.github.com/repos/jameslnewell/go-fetch')
  .then(res => console.log(res), err => console.log(err.stack))
;