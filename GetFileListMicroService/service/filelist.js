const axios = require('axios');
const LIST_URL = process.env.LIST_URL || '/cgi-bin/listTarFiles.cgi/logdata/';
const DATA_DOWNLOAD_URL = process.env.DATA_DOWNLOAD_URL || '/logdata/';
const axiosReplyTimeout = 500;
let LOG;
let LOGERR;

var filelist = {
  get: async function (req, res, next) {
    await getTarListFromRack(req.params.vehicleip, function (error, response) {
      if (!error) {
        res.status(200).send(response);
      } else {
        LOGERR(
          `${error.message}: ${error.status} - ${error.detail.code}, skipping (for ${error.detail.address})`
        );
        res.status(error.status).send(response);
      }
    });
  },
  setDebug: function (debug) {
    LOG = debug ? console.log.bind(console) : function () {};
    LOGERR = debug ? console.error.bind(console) : function () {};
  },
};

filelist.setDebug(true);

async function getTarListFromRack(ip, callback) {
  let filteredTarListFromRackWithCompleteURL = [];
  let finalresponse;
  let err;
  try {
    // cancel waiting for the actual reply if it takes too long
    let response = null;
    const source = axios.CancelToken.source();
    setTimeout(() => {
      if (response === null) {
        source.cancel();
      }
    }, axiosReplyTimeout);

    response = await axios.get(`http://${ip}${LIST_URL}`, {
      cancelToken: source.token,
    });
    const tarListFromRack = response.data.split(/\n|\r/g);
    const filteredTarListFromRack = tarListFromRack.filter(function (el) {
      return el; // filters out empty values
    });
    // add the base url:
    filteredTarListFromRackWithCompleteURL = filteredTarListFromRack.map(
      (tarURL) => {
        return (tarURL = `${ip}${DATA_DOWNLOAD_URL}${tarURL}`);
      }
    );
  } catch (error) {
    err = {
      message: 'Error while getting listing',
      status: 404,
      detail: error,
    };
  }
  finalresponse = JSON.stringify(filteredTarListFromRackWithCompleteURL);
  callback(err, finalresponse);
}

module.exports = filelist;
