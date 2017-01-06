var usersController = require("../controllers/users.server.controller");
module.exports = function(app){
    app.route('/users')
    .post(usersController.create)
    .get(usersController.find);
    
    app.route('/users/:userID')
        .get(usersController.read)
        .put(usersController.update)
        .delete(usersController.delete);
    
   
        
    
    app.param('userID',usersController.userByID);
}