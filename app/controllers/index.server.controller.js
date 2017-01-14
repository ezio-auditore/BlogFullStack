/**
 * Created by tonyStark on 1/2/2017.
 */

exports.render = function(req,res){

    if(req.session.lastVisit){
        console.log(req.session.lastVisit);
    }
    req.session.lastVisit = new Date();
    res.render('index',{
        title1 : 'Stark',
        title2:'App',
        hero_desc : 'A social Platform for DEVs and hobbyists alike',
        signup_url : '/signupAuth',
        login_url : '/loginPage',
        user : req.user ? JSON.stringify(req.user) : null,
        logout_url :'/logout',
        google_signUp_url : '/oauth/google',
        facebook_signUp_url : '/oauth/facebook'
    });
}
