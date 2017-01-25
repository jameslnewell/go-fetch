# @go-fetch/useragent

[![Circle CI](https://circleci.com/gh/go-fetch-js/useragent.svg?style=svg)](https://circleci.com/gh/go-fetch-js/useragent)

A plugin for `@go-fetch/client` to add a user agent to every request.

## Installation 

    npm install --save @go-fetch/client @go-fetch/useragent
    
## Usage

```javascript
const Client = require('@go-fetch/client');
const useragent  = require('..');

new Client()
  .use(useragent('go-fetch'))
  .get('https://api.github.com/repos/jameslnewell/go-fetch')
  .then(res => console.log(res), err => console.log(err.stack))
;

```
