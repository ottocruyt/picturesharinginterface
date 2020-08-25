const PORT = 3002; //TODO: setting
const API_ENDPOINT = 'downloadfile';
const axios = require('axios');
const HOST = 'localhost';

const downloadAndUntar = async (filelist) => {
  //console.log(`files.downloadAndTar -- ${new Date()}`);
  let allFileUrls = [];
  await Promise.all(
    filelist.map(async (file) => {
      try {
        const response = await downloadAndUntarFile(file);
        allFileUrls.push(response.data);
      } catch (error) {
        //console.log(error);
        console.log(`Problem during download cron job for ${file}`);
      }
    })
  );
  allFileUrls = [].concat.apply([], allFileUrls); // make it one big array
  console.log(
    `${new Date()} -- Finished downloading and untarring ${
      allFileUrls.length
    } files.`
  );
  return allFileUrls;
};

const downloadAndUntarFile = async (file) => {
  const url = `http://${HOST}:${PORT}/${API_ENDPOINT}/${file}`;
  return await axios.get(url);
};

module.exports = {
  downloadAndUntar,
};
