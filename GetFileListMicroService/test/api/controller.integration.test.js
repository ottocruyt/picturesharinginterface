const httpMocks = require('node-mocks-http');
const expect = require('chai').expect;
const controller = require('../../api/controller.js');
beforeEach(function () {});
afterEach(function () {});

describe('Controller integration tests', function () {
  describe('about', function () {
    it('should return about info', async function () {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: `/about/`,
      });
      const response = httpMocks.createResponse();
      let err;
      try {
        await controller.about(request, response);
      } catch (error) {
        console.log('test error:', error);
        err = error;
      } finally {
        expect(err).to.be.an('undefined');
        expect(response).to.be.a('object');
        expect(JSON.parse(response._getData())).to.have.property('name');
        expect(JSON.parse(response._getData())).to.have.property('version');
      }
    });
  });
});
