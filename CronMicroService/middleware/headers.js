const headerMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

module.exports = headerMiddleware;
