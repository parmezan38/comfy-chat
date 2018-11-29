// Middleware
module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } else {
            req.flash('error', 'Wrong username and/or password');
            res.render('login');            
        }
    }
}