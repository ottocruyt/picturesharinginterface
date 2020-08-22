const express = require('express');
const app = express();
const port = process.env.PORT || 3003;
const crons = require('./service/crons.js');
const routes = require('./api/routes');

// -- API for changing settings
routes(app);
app.listen(port, function () {
  console.log('Server started on port: ' + port);
});

// -- CRON JOBS

crons.startup();
