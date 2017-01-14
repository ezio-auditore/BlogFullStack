var postController = require("../controllers/posts.server.controller");
var signupController = require("../controllers/signup.server.controller");

module.exports = function(app){
    app.route('/api/posts')
        .get(postController.list)
        .post(signupController.requiresLogin,postController.create);
        
    app.route('/api/posts/:postID')
        .get(postController.read)
        .put(signupController.requiresLogin,postController.hasAuthorization,postController.update)
        .delete(signupController.requiresLogin,postController.hasAuthorization,postController.delete);
        
    app.param('postID',postController.postbyID);
}