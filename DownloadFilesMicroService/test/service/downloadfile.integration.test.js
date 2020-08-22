const expect = require('chai').expect;
const downloadfile = require('../../service/downloadfile.js');
const fs = require('fs');
const rewire = require('rewire');

describe('Downloadfile integration tests', function () {
  describe('startStreamAndTarring', function () {
    it('should return no error and destination url when connection is up', async function () {
      const downloadFileRewired = rewire('../../service/downloadfile.js');
      const startStreamAndTarring = downloadFileRewired.__get__(
        'startStreamAndTarring'
      );
      const readURL = 'http://10.203.215.176/logdata/2020-08-13_162446.tar.gz';
      const destinationURL = './test/testdata';
      let result;
      let err;
      try {
        result = await startStreamAndTarring(readURL, destinationURL);
      } catch (error) {
        err = error;
      } finally {
        expect(err).to.be.an('undefined');
        expect(result).to.equal(destinationURL);
      }
    }).timeout(20000);
    // TODO: cleanup!
  });
});
