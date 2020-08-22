const fs = require('fs');
var got = require('got');
var targz = require('node-tar.gz');
const utils = require('./utils');

const tarFolder = process.env.tarfolder || 'untarred';

var downloadfile = {
  get: function (req, res, next) {
    download(req.params, function (error, response) {
      if (!error) {
        res.send(response);
      } else {
        console.error(
          `${error.message}: ${error.status} skipping (for ${error.detail})`
        );
        res.status(error.status).send(response);
      }
    });
  },
};

async function download(params, callback) {
  let destinationUrl = [];
  let response = '';
  let error;
  try {
    destinationUrl = await downloadAndTarFile(params);
  } catch (err) {
    error = err;
  }
  response = JSON.stringify(destinationUrl);
  callback(error, response);
}

async function downloadAndTarFile(params) {
  const filenameWithoutExtension = utils.removeExtensionFrom(params.file);
  const folderName = `${params.ip}/${filenameWithoutExtension}`;
  const destinationUrl = `../${tarFolder}/${folderName}`;
  const readURL = `http://${params.ip}/${params.folder}/${params.file}`;
  if (await utils.fileAlreadyDownloaded(destinationUrl)) {
    console.log('file already downloaded, returning destination URL.');
    return destinationUrl;
  }
  return await startStreamAndTarring(readURL, destinationUrl);
}

const startStreamAndTarring = async (readURL, destinationURL) => {
  return new Promise((resolve, reject) => {
    //console.log(`Started stream -- ${new Date()}`);
    try {
      const read = got.stream(readURL);
      const write = targz().createWriteStream(destinationURL);
      read
        .on('error', (e) => {
          err = { message: 'Error during read', detail: readURL, status: 504 };
          reject(err);
        })
        .pipe(write)
        .on('error', () => {
          err = {
            message: 'Error during write',
            detail: destinationURL,
            status: 500,
          };
          reject(err);
        })
        .on('finish', () => {
          //console.log(`Finished stream -- ${new Date()}`);
          resolve(destinationURL);
        });
    } catch (error) {
      console.log(error);
      err = {
        message: 'Error during stream',
        detail: `${readURL}->${destinationURL}`,
        status: 500,
      };
      reject(err);
    }
  });
};

module.exports = downloadfile;
