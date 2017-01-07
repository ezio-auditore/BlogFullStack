/**
 * Created by tonyStark on 1/7/2017.
 */

var passport = require('passport'),
    url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    signupController = require("../../app/controllers/signup.server.controller.js");

module.exports = function(){
    passport.use(new FacebookStrategy({
        clientID : config.facebook.clientID,
        clientSecret :config.facebook.clientSecret,
        callbackURL : config.facebook.callbackURL,
        passReqToCallback : true
    },function(req,res,accessToken,refreshToken,profile,done){
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        var providerUserProfile = {
            firstName : profile.name.givenName,
            lastName : profile.name.familyName,
            email : profile.emails[0].value,
            username : profile.username,
            provider :'facebook',
            providerID : profile.id,
            providerData :providerData
        };
        signupController.saveOAuthUserProfile(req,res,providerUserProfile,done);
    }));
}
