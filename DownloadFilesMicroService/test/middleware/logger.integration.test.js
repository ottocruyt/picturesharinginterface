const httpMocks = require('node-mocks-http');
const expect = require('chai').expect;
const logger = require('../../middleware/logger.js');
beforeEach(function () {});
const originalLog = console.log;
let consoleOutput = [];
const mockedLog = (output) => consoleOutput.push(output);

describe('Logger integration tests', function () {
  describe('requests', function () {
    afterEach(() => resetConsoleLog());
    beforeEach(() => (console.log = mockedLog));
    it('should log a get request', function () {
      const request = httpMocks.createRequest({
        method: 'GET',
        url: `/about/`,
      });
      const response = httpMocks.createResponse();
      const next = function () {};
      let err;
      logger(request, response, next);
      resetConsoleLog();
      expect(consoleOutput).not.to.be.empty;
      expect(err).to.be.undefined;
    });
  });
});

function resetConsoleLog() {
  console.log = originalLog;
}
