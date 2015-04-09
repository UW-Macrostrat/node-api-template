module.exports = function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
}
