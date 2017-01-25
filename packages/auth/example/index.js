'use strict';
const Client = require('@go-fetch/client');
const auth = require('..');

new Client()
	.use(auth.basic('steve.jobs', 'l33tH@ck3r'))
	.get('http://httpbin.org/hidden-basic-auth/steve.jobs/l33tH@ck3r')
    .then(res => res.text())
    .then(text => console.log(text), err => console.error(err.stack))
;
