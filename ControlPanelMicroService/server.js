const express = require('express');
const app = express();
const port = process.env.PORT || 3004;
const routes = require('./api/routes');

// -- API for changing settings
routes(app);

app.use(express.static('./service'));

app.listen(port, function () {
  console.log('Server started on port: ' + port);
});
