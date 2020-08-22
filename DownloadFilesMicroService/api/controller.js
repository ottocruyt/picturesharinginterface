'use strict';

var properties = require('../package.json');
var downloadfile = require('../service/downloadfile.js');

var controllers = {
  about: function (req, res) {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },
  downloadfile: async function (req, res) {
    await downloadfile.get(req, res, function (err, downloadFolder) {
      if (err) {
        res.send(err.message);
      }
      res.json(downloadFolder);
    });
  },
};

module.exports = controllers;
