const axios = require('axios');
const HOST = 'localhost';
const PORT = 3001; //TODO: setting
const API_ENDPOINT = 'filelist';
const IPS = ['10.203.215.176']; //TODO: setting

const get = async () => {
  //console.log(`filelists.get -- ${new Date()}`);
  let allIpFileLists = [];
  await Promise.all(
    IPS.map(async (ip) => {
      try {
        const response = await getFromIp(ip);
        allIpFileLists.push(response.data);
      } catch (error) {
        console.log(`Problem during filelist cron job: ${error.config.url}`);
      }
    })
  );
  allIpFileLists = [].concat.apply([], allIpFileLists); // make it one big array
  //console.log(allIpFileLists);
  return allIpFileLists;
};

async function getFromIp(ip) {
  //console.log(`filelists.getFromIp(${ip}) -- ${new Date()}`);
  const url = `http://${HOST}:${PORT}/${API_ENDPOINT}/${ip}`;
  return await axios.get(url);
}

module.exports = {
  get,
};
