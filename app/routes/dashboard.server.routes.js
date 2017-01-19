module.exports = function(app) {
    var dashboard = require('../controllers/dashboard.server.controller');
    var signupController = require("../controllers/signup.server.controller");
    app.get('/dashboard', signupController.requiresLogin, dashboard.render);
}
