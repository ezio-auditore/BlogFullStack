var postController = require("../controllers/posts.server.controller");
var usersController = require("../controllers/users.server.controller");

module.exports = function(app){
    app.route('/post/:userID')
        .post(postController.create);
        
    app.param('userID',usersController.userByID);
}