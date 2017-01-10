var passport = require("passport"),
    url = require("url"),
    GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
    config  = require("../config"),
    signupController = require("../../app/controllers/signup.server.controller.js");
    
module.exports = function(){
    passport.use(new GoogleStrategy({
        clientID : config.google.clientID,
        clientSecret :config.google.clientSecret,
        callbackURL : config.google.callbackURL,
        passReqToCallback : true
    },function(req,res,accessToken,refreshToken,profile,done){
        var providerData = profile._json;
        console.log(providerData);
        console.log(profile);
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;
        
        var providerUserProfile = {
            firstName : profile.name.givenName,
            lastName : profile.name.familyName,
            email : profile.emails[0].value,
            username : providerData.username,
            provider :'google',
            providerID : profile.providerID,
            providerData :providerData,
            gender : providerData.gender,
            image : providerData.image.url
        };
        signupController.saveOAuthUserProfile(req,res,providerUserProfile,done);
    }));
}
    
    
    