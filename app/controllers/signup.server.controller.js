/**
 * Created by tonyStark on 1/4/2017.
 */
exports.render = function(req,res){
    res.render('signup',{
        signup_title : 'Sign up',
        title1 : 'Stark',
        title2:'App',
        referer:'signup',
        messages : []
    })
}
var getErrorMessages = function(err){
    var message = [];
    if(err.code){
        switch (err.code) {
            case 11000:
            case 11001:
                message='Username already exists'
                break;
            
            default:
                message:'Something went wrong'
        }
    }
    else{
        for(var errName in err.errors){
            if(err.errors[errName].message)
                message = err.errors[errName].message;
            
        }
    }
    return message;
}
exports.renderSignin = function(req,res,next){
    if(!req.user){
        res.render('signup',{
        signup_title : 'Login',
        title1 : 'Stark',
        title2:'App',
        referer:'login',
        messages : req.flash('error')|| req.flash('info')
    });
    }else{
        return res.redirect('/');
    }
};
exports.renderSignup = function(req,res,next){
    if(!req.user){
        res.render('signup',{
        signup_title : 'Signup',
        title1 : 'Stark',
        title2:'App',
        referer:'signup',
        messages : req.flash('error')
    });
    }else{
        return res.redirect('/');
    }
};

exports.signup = function(req,res,next){
    var User = require("mongoose").model('User');
    
    if(!req.user){
        var user = new User(req.body);
        console.log(req.body);
        var messages = null;
        user.provider = 'local';
        user.save(function(err){
            if(err){
                console.log(err);
                messages = getErrorMessages(err);
                //console.log(messages);
                req.flash('error',messages);
                return res.redirect('/signupAuth')
            }else{
            req.login(user,function(err){
                if(err) return next(err);
                return res.redirect('/');
            });
        }
        });
    }else{
        res.redirect('/');
    }
};
exports.signout = function(req,res){
    console.log(req.user.fullName+' has logged out');
    req.logout();
    res.redirect('/');
}

exports.saveOAuthUserProfile = function(req,res,profile,done){
    var User = require("mongoose").model('User');
    User.findOne({
        provider : profile.provider,
        providerId : profile.providerId,
        email : profile.email
    },function(err,user){
        if(err)
            return done(err);
        else{
            if(!user){
              
               var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
               User.findUniqueUsername(possibleUsername,null,function(availableUsername){
                   profile.username = availableUsername;
                   user = new User(profile);
                   user.save(function(err){
                       if(err) {
                       var message = getErrorMessages(err);
                       console.log("Error in saving profile:"+message);
                            req.flash('error',message);
                            return res.redirect('/signupAuth');
                       }
                       console.log("Sending done after new-user save ")
                       return done(err,user);
                   });
               });
            }
            return done(err,user);
        }
    });
}
