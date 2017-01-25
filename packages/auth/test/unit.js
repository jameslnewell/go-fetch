const expect = require('chai').expect;
const sinon = require('sinon');
const Client = require('@go-fetch/client');
const auth = require('..');
const Request = Client.Request;

describe('@go-fetch/auth', () => {

  describe('basic()', () => {

    it('should set the header with the username and password encoded', done => {

      //mock the client
      const client = {before: sinon.spy()};
      const req = new Client.Request();

      //setup the plugin
      auth.basic('steve.jobs', 'l33tH@ck3r')(client);

      //handle a request and check the header is set
      client.before.args[0][0](req, (err, req) => {

        //parse the header
        const
          header = (new Buffer(req.headers['Authorization'].substr(6), 'base64').toString()),
          username = header.split(':')[0],
          password = header.split(':')[1]
        ;
        expect(username).to.be.equal('steve.jobs');
        expect(password).to.be.equal('l33tH@ck3r');

        done(err);
      });

    });

  });

  describe('bearer()', () => {

    it('should set the header with the token', done => {

      //mock the client
      const client = {before: sinon.spy()};
      const req = new Client.Request();

      //setup the plugin
      auth.bearer('abcdefg')(client);

      //handle a request and check the header is set
      client.before.args[0][0](req, (err, req) => {

        //parse the header
        const header = (new Buffer(req.headers['Authorization'].substr(7)).toString());
        expect(header).to.be.equal('abcdefg');

        done(err);
      });

    });

  });


});
