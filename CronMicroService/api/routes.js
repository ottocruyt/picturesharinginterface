"use strict";

const controller = require("./controller");
const logger = require("../middleware/logger");
const headers = require("../middleware/headers");
const bodyParser = require("body-parser");

module.exports = function (app) {
  // application level middleware for logging
  app.use(logger);
  app.use(headers);
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());

  app.route("/about").get(controller.about);

  // settings
  app.route("/settings").get(controller.getSettings);
  app.route("/settings").post(controller.setSettings);

  //app.route('/ip/:ip').post(controller.addip);
  //app.route('/ip/:ip').delete(controller.deleteip);
  //app.route('/ip/:ip').get(controller.getips);
  //app.route('/frequency/:frequency').post(controller.changefrequency);
};
