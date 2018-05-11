module.exports = function(req, res, next) {
  res.sendHttpError = function(error) {
    res.status(error.status);
    console.log(req.params)

    if (req.xhr) { // identify if it's an Ajax request
      res.json(error);
    } else {
      res.render('error', { error });
    }
  };

  next();
}
