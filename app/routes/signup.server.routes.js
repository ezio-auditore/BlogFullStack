/**
 * Created by tonyStark on 1/4/2017.
 */
module.exports =function(app){
    var signup = require('../controllers/signup.server.controller');
    app.get('/signup',signup.render);
}