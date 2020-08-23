"use strict";

const controller = require("./controller");
const logger = require("../middleware/logger");

module.exports = function (app) {
  // application level middleware for logging
  app.use(logger);

  app.route("/about").get(controller.about);
};
