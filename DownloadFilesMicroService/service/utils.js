const fs = require('fs');

const extractIpFromUrl = function (url) {
  const regex = new RegExp(/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/);
  let ip = url.match(regex);
  if (ip === null) {
    ip = '';
  } else {
    ip = ip[0];
  }
  return ip;
};

const extractFileNameFromUrl = function (url) {
  const fileNameWithExtension = extractFileNameWithExtensionFromUrl(url);
  let fileName = fileNameWithExtension;
  const filenameWithoutExtenion = removeExtensionFrom(fileName);
  return filenameWithoutExtenion;
};

const removeExtensionFrom = function (filename) {
  let fileName = filename;
  if (fileName.includes('.tar.gz')) {
    fileName = removeExtension(fileName);
  }
  fileName = removeExtension(fileName);
  return fileName;
};

const extractFileNameWithExtensionFromUrl = function (url) {
  return url.substring(url.lastIndexOf('/') + 1);
};

const removeExtension = function (fileNameWithExtension) {
  if (fileNameWithExtension.includes('.')) {
    return fileNameWithExtension.split('.').slice(0, -1).join('.');
  } else {
    return fileNameWithExtension;
  }
};

const isDirEmpty = function (dirname) {
  return fs.promises.readdir(dirname).then((files) => {
    return files.length === 0;
  });
};

const fileAlreadyDownloaded = async function (destinationUrl) {
  let alreadyDownloaded = false;
  if (fs.existsSync(destinationUrl)) {
    // the folder exists, but it might be empty
    const empty = await isDirEmpty(destinationUrl);
    if (!empty) {
      alreadyDownloaded = true; // already downloaded previously
    }
  }
  return alreadyDownloaded;
};

module.exports = {
  extractIpFromUrl,
  extractFileNameFromUrl,
  removeExtensionFrom,
  removeExtension,
  isDirEmpty,
  fileAlreadyDownloaded,
};
