const expect = require('chai').expect;
const sinon = require('sinon');
const Client = require('@go-fetch/client');
const useragent = require('..');

const client = {};

describe('@go-fetch/useragent', () => {

	it('should add a `User-Agent` header with the default value', done => {

		//mock the client
		const client = {before: sinon.spy()};
		const req = new Client.Request();

		//setup the plugin
    useragent()(client);

    //handle a request and check the header is set
		client.before.args[0][0](req, (err, req) => {
      expect(req.headers).has.a.property('User-Agent').equal('go-fetch');
      done(err);
		});

	});

  it('should add a `User-Agent` header with the supplied value', done => {

    //mock the client
    const client = {before: sinon.spy()};
    const req = new Client.Request();

    //setup the plugin
    useragent('example-browser')(client);

    //handle a request and check the header is set
    client.before.args[0][0](req, (err, req) => {
      expect(req.headers).has.a.property('User-Agent').equal('example-browser');
      done(err);
    });

  });

});
