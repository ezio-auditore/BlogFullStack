/**
 * Created by tonyStark on 1/2/2017.
 */
var  mongoose = require("./config/mongoose"),
     express = require('./config/express'),
     passport = require("./config/passport");

var app = express();
var db = mongoose();
var passport = passport();
app.listen(process.env.PORT||3000);
module.exports = app;

console.log('Server running at %s:%s ',process.env.IP,process.env.PORT);

