const httpMocks = require('node-mocks-http');
const expect = require('chai').expect;
const filelist = require('../../service/filelist.js');
const testIP = '10.203.215.176';
const testFakeIP = '10.203.215.177';
const rewire = require('rewire');
const timeoutMsNoConnection = 1000;
const timeoutMsWithConnection = 1000;

beforeEach(function () {
  filelist.setDebug(false); // prevent console output
});
afterEach(function () {
  filelist.setDebug(true); // re-enable console output
});

describe('Filelist integration tests', function () {
  describe('getTarListFromRack', function () {
    it('should call the callback with error and empty array if no connection', async function () {
      this.timeout(timeoutMsNoConnection);
      const ip = testFakeIP;
      const callback = function (error, response) {
        expect(error).to.not.be.an('undefined');
        expect(JSON.parse(response)).to.be.an('array');
      };
      const filelistRewired = rewire('../../service/filelist.js');
      const getTarListFromRack = filelistRewired.__get__('getTarListFromRack');
      await getTarListFromRack(ip, callback);
    });
    it('should call the callback with no error and array if connection', async function () {
      this.timeout(timeoutMsNoConnection);
      const ip = testIP;
      const callback = function (error, response) {
        if (error) {
          console.log(error);
        }
        expect(error).to.be.an('undefined');
        expect(JSON.parse(response)).to.be.an('array');
      };
      const filelistRewired = rewire('../../service/filelist.js');
      const getTarListFromRack = filelistRewired.__get__('getTarListFromRack');
      await getTarListFromRack(ip, callback);
    });
  });
  describe('Filelist.get', function () {
    it('should return status code 404 without connection', async function () {
      this.timeout(timeoutMsNoConnection);
      let result, err;
      const request = httpMocks.createRequest({
        method: 'GET',
        url: `/filelist/${testFakeIP}`,
        params: { vehicleip: testFakeIP },
      });
      const response = httpMocks.createResponse();
      try {
        await filelist.get(request, response);
      } catch (error) {
        console.log('test error:', error);
        err = error;
      } finally {
        expect(err).to.be.an('undefined');
        expect(response).to.be.a('object');
        expect(response).to.have.property('statusCode');
        expect(response.statusCode).to.equal(404);
      }
    });
    it('should return status code 200 with connection', async function () {
      this.timeout(timeoutMsWithConnection);
      let result, err;
      const request = httpMocks.createRequest({
        method: 'GET',
        url: `/filelist/${testIP}`,
        params: { vehicleip: testIP },
      });
      const response = httpMocks.createResponse();
      try {
        await filelist.get(request, response);
      } catch (error) {
        console.log('test error:', error);
        err = error;
      } finally {
        expect(err).to.be.an('undefined');
        expect(response).to.be.a('object');
        expect(response).to.have.property('statusCode');
        expect(response.statusCode).to.equal(200);
      }
    });
    it('should reply with an array', async function () {
      this.timeout(timeoutMsWithConnection);
      let result, err;
      const request = httpMocks.createRequest({
        method: 'GET',
        url: `/filelist/${testIP}`,
        params: { vehicleip: testIP },
      });
      const response = httpMocks.createResponse();
      try {
        await filelist.get(request, response);
      } catch (error) {
        console.log('test error:', error);
        err = error;
      } finally {
        expect(err).to.be.an('undefined');
        expect(response).to.be.a('object');
        expect(response).to.have.property('statusCode');
        expect(JSON.parse(response._getData())).to.be.an('array');
      }
    });
  });
});
