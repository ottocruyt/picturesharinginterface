'use strict';

var properties = require('../package.json');

var controllers = {
  about: function (req, res) {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },
};

module.exports = controllers;
