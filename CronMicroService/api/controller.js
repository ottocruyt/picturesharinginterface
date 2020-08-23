"use strict";

var properties = require("../package.json");
const settings = require("../service/settings.js");

var controllers = {
  about: function (req, res) {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },
  getSettings: function (req, res) {
    const currentSettings = settings.getAllSettings();
    res.json(currentSettings);
  },
  setSettings: function (req, res) {
    const newSettings = settings.setAllSettings(req.body);
    res.json(newSettings);
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
