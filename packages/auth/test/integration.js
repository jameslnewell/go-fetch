const expect = require('chai').expect;
const Client = require('@go-fetch/client');
const json = require('@go-fetch/json');
const auth = require('..');

describe('@go-fetch/auth', function() {
  this.timeout(10000);

  describe('basic()', () => {

    it('should be authenticated as steve.jobs', () => {

      return new Client()
        .use(auth.basic('steve.jobs', 'l33tH@ck3r'))
        .use(json())
        .get('http://httpbin.org/hidden-basic-auth/steve.jobs/l33tH@ck3r')
        .then(res => {
          expect(res.status).to.be.equal(200);
          return res.json();
        })
        .then(json => {
          expect(json).to.have.property('authenticated').to.be.true;
          expect(json).to.have.property('user').to.be.equal('steve.jobs');
        })
      ;

    });

  });

});
