/**
 * Created by tonyStark on 1/4/2017.
 */
module.exports =function(app){
    var signup = require('../controllers/signup.server.controller');
    var login = require('../controllers/signin.server.controller');
    //var usersController = require("../controllers/users.server.controller");
    var passport = require("passport");
    app.get('/signupPage',signup.render);
    app.get('/loginPage',login.render);
    
     app.route('/signupAuth')
        .get(signup.renderSignup)
        .post(signup.signup);
    
    app.route('/loginAuth')
        .get(signup.renderSignin)
        .post(passport.authenticate('local',{
            successRedirect :'/',
            failureRedirect : '/loginAuth',
            failureFlash : true
        }));
    app.get('/oauth/google',passport.authenticate('google',{
        failureRedirect : '/signupAuth',
        scope : [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
            ]
    }));
    app.get('/oauth/google/callback',passport.authenticate('google',{
        failureRedirect : '/signupAuth',
        successRedirect : '/'
    }));
    app.get('/oauth/facebook',passport.authenticate('facebook',{scope: ['public_profile', 'email']}));
    app.get('/oauth/facebook/callback',passport.authenticate('facebook',{
          
        failureRedirect : '/signupAuth',
        successRedirect : '/'
    }));
    
    app.route('/logout')
        .get(signup.signout);
}