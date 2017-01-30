const chai = require('chai');
const promised = require('chai-as-promised');
const sinon = require('sinon');
const Client = require('./packages/client');

chai.use(promised);

global.sinon = sinon;
global.expect = chai.expect;
global.Request = Client.Request;
global.Response = Client.Response;

global.createFakeClient = () => {
  const client = {};
  client.before = sinon.stub().returns(client);
  client.after = sinon.stub().returns(client);
  return client;
};