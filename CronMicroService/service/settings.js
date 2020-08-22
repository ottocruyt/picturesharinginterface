const fs = require("fs");
const nconf = require("nconf");
const path = require("path");
const configPath = path.join(__dirname, "config", "config.json");
nconf.file({ file: configPath });

// get config: nconf.get('variable:subvariable')
// set config: nconf.set('variable:subvariable', number/'string')
// the add persistency:  save config: nconf.save(function (err) {  console.log(err);});
// can put new vars in, but json file should have at least {}

function removeIp(ip) {
  const iplist = nconf.get("iplist");
  removeAllElements(iplist, ip);
  set("iplist", iplist);
}

function addIp(ip) {
  const iplist = nconf.get("iplist");
  iplist.push(ip);
  set("iplist", iplist);
}

function set(setting, value) {
  let rawdata = fs.readFileSync(configPath);
  let parsedData = JSON.parse(rawdata);
  console.log("parsed:", parsedData);
  let newData = { ...parsedData, setting: value };
  console.log("newData:", newData);
  fs.writeFileSync(configPath, JSON.stringify(newData));
}
function get(setting) {
  //nconf.file({ file: configPath });
  let rawdata = fs.readFileSync(configPath);
  let parsedJson = JSON.parse(rawdata);
  console.log("parsed:", parsedJson);
  let reqSetting = parsedJson.setting;
  console.log("reqSetting:", reqSetting);
  return reqSetting;
}

function save(callback) {
  nconf.save(callback);
}
function resetToDefaults() {
  set("iplist", ["10.203.215.176", "10.203.215.177", "10.203.215.176"]);
  set("ports:download", 3002);
  set("ports:filelist", 3001);
  set("frequency", 1);
}

function removeAllElements(array, elem) {
  var index = array.indexOf(elem);
  while (index > -1) {
    array.splice(index, 1);
    index = array.indexOf(elem);
  }
}

const settings = {
  removeIp,
  addIp,
  get,
  set,
  resetToDefaults,
};

module.exports = settings;
