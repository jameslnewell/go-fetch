require('../../../setupTestGlobals');
const useragent = require('..');

describe('@go-fetch/useragent', () => {

	it('should add a `User-Agent` header with the default value', done => {

		//mock the client
		const client = createFakeClient();
		const req = new Request();

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
    const client = createFakeClient();
    const req = new Request();

    //setup the plugin
    useragent('example-browser')(client);

    //handle a request and check the header is set
    client.before.args[0][0](req, (err, req) => {
      expect(req.headers).has.a.property('User-Agent').equal('example-browser');
      done(err);
    });

  });

});
