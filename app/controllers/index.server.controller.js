/**
 * Created by tonyStark on 1/2/2017.
 */

exports.render = function(req,res){

    if(req.session.lastVisit){
        console.log(req.session.lastVisit);
    }
    req.session.lastVisit = new Date();
    res.render('index',{
        title : 'Hello Mr.Stark'
    });
}
