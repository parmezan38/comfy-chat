// Middleware
const nameGenerator = require('../bin/name_generator'),
      colorGenerator = require('../bin/color_generator');
module.exports = {
  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('error', 'Wrong username and/or password');
      res.render('login');
    }
  },
  storeUserInfoToLocals: function (req, res, next) {
    if (req.user) {
      res.locals.userInfo = {
        username: nameGenerator.capitalizeAndRemoveUnderscores(req.user),
        color1: colorGenerator.deconstructColorCode(req.session.color1),
        color2: colorGenerator.deconstructColorCode(req.session.color2)
      };
    } else {
      res.locals.userInfo = null;
    }
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
  }
};
