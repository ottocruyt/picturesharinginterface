'use strict';

const controller = require('./controller');
const logger = require('../middleware/logger');

module.exports = function (app) {
  // application level middleware for logging
  app.use(logger);

  app.route('/about').get(controller.about);

  // settings
  //app.route('/ip/:ip').post(controller.addip);
  //app.route('/ip/:ip').delete(controller.deleteip);
  //app.route('/ip/:ip').get(controller.getips);
  //app.route('/frequency/:frequency').post(controller.changefrequency);
};
