exports.render = function(req,res){
    res.render('dashboard',{
        title1 : 'Stark',
        title2:'App',
        user : req.user ? JSON.stringify(req.user) : null,
        logout_url :'/logout'
    });
}
