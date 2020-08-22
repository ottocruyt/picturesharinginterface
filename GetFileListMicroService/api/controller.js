'use strict';

var properties = require('../package.json');
var filelist = require('../service/filelist.js');

var controllers = {
  about: function (req, res) {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },
  getFileList: async function (req, res) {
    await filelist.get(req, res, function (err, filelist) {
      if (err) {
        res.send(err.message);
      }
      console.log(filelist);
      res.json(filelist);
    });
  },
};

module.exports = controllers;
