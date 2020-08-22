'use strict';

var properties = require('../package.json');
//var settings = require('../service/settings.js');

var controllers = {
  about: function (req, res) {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },

  // todo
  /*
  addip: async function (req, res) {
    await settings.addip(req, res, function (err, ip) {
      if (err) {
        res.send(err.message);
      }
      res.json(ip);
    });
  }*/
};

module.exports = controllers;
