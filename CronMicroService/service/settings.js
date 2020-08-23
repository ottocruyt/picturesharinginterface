const fs = require("fs");
const path = require("path");
const configPath = path.join(__dirname, "config", "config.json");

function removeIp(ip) {
  const iplist = get("iplist");
  removeAllElements(iplist, ip);
  set("iplist", iplist);
}

function addIp(ip) {
  const iplist = get("iplist");
  iplist.push(ip);
  set("iplist", iplist);
}

function set(setting, value) {
  let rawdata = fs.readFileSync(configPath);
  let parsedData = JSON.parse(rawdata);
  //console.log("parsed:", parsedData);
  let newData = parsedData;
  newData[setting] = value;
  //console.log("newData:", newData);
  fs.writeFileSync(configPath, JSON.stringify(newData));
}
function get(setting) {
  let rawdata = fs.readFileSync(configPath);
  let parsedJson = JSON.parse(rawdata);
  //console.log("parsed:", parsedJson);
  let reqSetting = parsedJson[setting];
  //console.log("reqSetting:", reqSetting);
  return reqSetting;
}

function getAllSettings() {
  let rawdata = fs.readFileSync(configPath);
  let parsedJson = JSON.parse(rawdata);
  return parsedJson;
}
function setAllSettings(settings) {
  fs.writeFileSync(configPath, JSON.stringify(settings));
  return settings;
}

function check(setting, value) {
  const currentSettingValue = get(setting);
  return currentSettingValue === value;
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
  getAllSettings,
  set,
  setAllSettings,
  check,
  resetToDefaults,
};

module.exports = settings;
