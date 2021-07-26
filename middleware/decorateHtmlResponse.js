function decorateHtmlResponse(pageTitle) {
  return (req, res, next) => {
    res.locals.html = true;
    res.locals.title = `${pageTitle}`;
    res.locals.loggedInUser = {}
    res.locals.errors = {}
    res.locals.data = {}
    res.locals.error = {}
    res.locals.value = {}
    res.locals.auth = false
    res.locals.registerFail = false;
    next()
  }
}
module.exports = decorateHtmlResponse;
