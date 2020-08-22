const expect = require('chai').expect;
const settings = require('../../service/settings.js');
const fs = require('fs');
const path = require('path');
let currentSettings;
before(async function () {
  const json = await fs.readFileSync(
    path.resolve(__dirname, '../../service/config/config.json')
  );
  currentSettings = JSON.parse(json);
  settings.resetToDefaults();
});
beforeEach(async function () {
  settings.resetToDefaults();
});
afterEach(async function () {
  settings.resetToDefaults();
});
after(async function () {
  await fs.writeFileSync(
    path.resolve(__dirname, '../../service/config/config.json'),
    JSON.stringify(currentSettings)
  );
});

describe('Settings unit tests', function () {
  describe('get', function () {
    it('should return iplist when asked for it', function () {
      const iplist = settings.get('iplist');
      expect(iplist).to.not.be.an('undefined');
      expect(iplist).to.be.an('array');
      expect(iplist[0]).to.equal('10.203.215.176');
    });
    it('should return download port when asked for it', function () {
      const downloadport = settings.get('ports:download');
      expect(downloadport).to.not.be.an('undefined');
      expect(downloadport).to.be.a('number');
      expect(downloadport).to.equal(3002);
    });
    it('should return listing  port when asked for it', function () {
      const filelistport = settings.get('ports:filelist');
      expect(filelistport).to.not.be.an('undefined');
      expect(filelistport).to.be.a('number');
      expect(filelistport).to.equal(3001);
    });
  });
  describe('remove ip', function () {
    it('should remove every ip that equals specified ip from iplist', function () {
      settings.removeIp('10.203.215.176');
      const iplist = settings.get('iplist');
      expect(iplist.length).to.equal(1);
      expect(iplist[0]).to.equal('10.203.215.177');
    });
  });
  describe('add ip', function () {
    it('should add specified ip to iplist', function () {
      settings.addIp('10.203.215.99');
      const iplist = settings.get('iplist');
      expect(iplist.length).to.equal(4);
      expect(iplist[3]).to.equal('10.203.215.99');
    });
  });
  describe('set', function () {
    it('should set filelist port', function () {
      settings.set('ports:filelist', 5);
      const downloadPort = settings.get('ports:filelist');
      expect(downloadPort).to.equal(5);
    });
    it('should set download port', function () {
      settings.set('ports:download', 1);
      const downloadPort = settings.get('ports:download');
      expect(downloadPort).to.equal(1);
    });
  });
});
