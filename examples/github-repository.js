const Client = require('@go-fetch/client');
const json = require('@go-fetch/json');
const useragent = require('@go-fetch/useragent');

new Client()
  .use(json())
  .use(useragent())
  .get('https://api.github.com/repos/jameslnewell/go-fetch', {Accept: 'application/vnd.github.v3+json'})
    .then(res => res.json())
    .then(json => console.log(json), err => console.error(err.stack))
;
