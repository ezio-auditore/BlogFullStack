/**
 * Created by tonyStark on 1/4/2017.
 */
exports.render = function(req,res){
    res.render('signup',{
        signup_title : 'Sign up',
        title1 : 'Stark',
        title2:'App'
    })
}