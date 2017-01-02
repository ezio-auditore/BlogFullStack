/**
 * Created by tonyStark on 1/2/2017.
 */

var  config = require('./config.js'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    session = require('express-session');

module.exports =function(){
    var app = express();
    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }
    else if(process.env.NODE_ENV === 'production'){
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({extended : true}));

    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        saveUninitalized :true,
        resave : true,
        secret :config.sessionSecret
    }));
    app.set('views','./app/views');
    app.set('view engine','ejs');
    app.use(express.static('./public'));
    require('../app/routes/index.server.routes.js')(app);
    return app;
};



