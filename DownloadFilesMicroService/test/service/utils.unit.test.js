const expect = require('chai').expect;
const utils = require('../../service/utils.js');
const fs = require('fs');
describe('Utils unit tests', function () {
  describe('extractIpFromUrl', function () {
    it('should return the ip', function () {
      const url = 'http://10.203.215.176/download/blabla.bla.bla';
      let ip = utils.extractIpFromUrl(url);
      expect(ip).to.be.a('string');
      expect(ip).to.equal('10.203.215.176');
    });
    it('should return empty string if no ip', function () {
      const url = 'http://xxxxxx/download/blabla.bla.bla';
      let ip = utils.extractIpFromUrl(url);
      expect(ip).to.be.a('string');
      expect(ip).to.equal('');
    });
  });
  describe('removeExtension', function () {
    it('should remove single extension', function () {
      const filename = 'blabla.ext';
      let filenameWithoutExtension = utils.removeExtension(filename);
      expect(filenameWithoutExtension).to.be.a('string');
      expect(filenameWithoutExtension).to.equal('blabla');
    });
    it('should not remove anything if no extension', function () {
      const filename = 'blabla';
      let filenameWithoutExtension = utils.removeExtension(filename);
      expect(filenameWithoutExtension).to.be.a('string');
      expect(filenameWithoutExtension).to.equal('blabla');
    });
  });
  describe('removeExtensionFrom', function () {
    it('should remove single extension', function () {
      const filename = 'blabla.ext';
      let filenameWithoutExtension = utils.removeExtensionFrom(filename);
      expect(filenameWithoutExtension).to.be.a('string');
      expect(filenameWithoutExtension).to.equal('blabla');
    });
    it('should not remove anything if no extension', function () {
      const filename = 'blabla';
      let filenameWithoutExtension = utils.removeExtensionFrom(filename);
      expect(filenameWithoutExtension).to.be.a('string');
      expect(filenameWithoutExtension).to.equal('blabla');
    });
    it('should remove .tar.gz', function () {
      const filename = 'blabla.tar.gz';
      let filenameWithoutExtension = utils.removeExtensionFrom(filename);
      expect(filenameWithoutExtension).to.be.a('string');
      expect(filenameWithoutExtension).to.equal('blabla');
    });
  });
  describe('extractFileNameFromUrl', function () {
    it('should extract the filename without extension', function () {
      const url = 'http://xxxxxx/download/blabla.ext';
      let filenameWithoutExtension = utils.extractFileNameFromUrl(url);
      expect(filenameWithoutExtension).to.be.a('string');
      expect(filenameWithoutExtension).to.equal('blabla');
    });
    it('should not remove anything if no extension', function () {
      const url = 'http://xxxxxx/download/blabla';
      let filenameWithoutExtension = utils.extractFileNameFromUrl(url);
      expect(filenameWithoutExtension).to.be.a('string');
      expect(filenameWithoutExtension).to.equal('blabla');
    });
    it('should remove .tar.gz', function () {
      const url = 'http://xxxxxx/download/blabla.tar.gz';
      let filenameWithoutExtension = utils.extractFileNameFromUrl(url);
      expect(filenameWithoutExtension).to.be.a('string');
      expect(filenameWithoutExtension).to.equal('blabla');
    });
  });
  describe('isDirEmpty', async function () {
    before(async function () {
      await fs.mkdirSync('testdir');
      await fs.mkdirSync('testdir2');
      const content = 'test';
      await fs.writeFileSync('testdir2/test.txt', content);
    });
    after(async function () {
      await fs.rmdirSync('testdir');
      await fs.unlinkSync('testdir2/test.txt');
      await fs.rmdirSync('testdir2');
    });
    it('should return empty if dir empty', async function () {
      let empty = await utils.isDirEmpty('testdir');
      expect(empty).to.be.a('boolean');
      expect(empty).to.be.true;
    });
    it('should not return empty if something is in folder', async function () {
      let empty = await utils.isDirEmpty('testdir2');
      expect(empty).to.be.a('boolean');
      expect(empty).to.be.false;
    });
  });
  describe('fileAlreadyDownloaded', async function () {
    before(async function () {
      await fs.mkdirSync('testdir');
      await fs.mkdirSync('testdir2');
      const content = 'test';
      await fs.writeFileSync('testdir2/test.txt', content);
    });
    after(async function () {
      await fs.rmdirSync('testdir');
      await fs.unlinkSync('testdir2/test.txt');
      await fs.rmdirSync('testdir2');
    });
    it('should return false if dir doesnt exist', async function () {
      let alreadyDownloaded = await utils.fileAlreadyDownloaded(
        'testdirNonExistent'
      );
      expect(alreadyDownloaded).to.be.a('boolean');
      expect(alreadyDownloaded).to.be.false;
    });
    it('should return false if dir empty', async function () {
      let alreadyDownloaded = await utils.fileAlreadyDownloaded('testdir');
      expect(alreadyDownloaded).to.be.a('boolean');
      expect(alreadyDownloaded).to.be.false;
    });
    it('should not return true if something is in folder', async function () {
      let alreadyDownloaded = await utils.fileAlreadyDownloaded('testdir2');
      expect(alreadyDownloaded).to.be.a('boolean');
      expect(alreadyDownloaded).to.be.true;
    });
  });
});
