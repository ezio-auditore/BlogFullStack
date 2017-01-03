/**
 * Created by tonyStark on 1/2/2017.
 */

var express = require('./config/express'),
    mongoose = require("./config/mongoose");

var app = express();
var db = mongoose();
app.listen(process.env.PORT||3000);
module.exports = app;

console.log('Server running at %s:%s ',process.env.IP,process.env.PORT);

