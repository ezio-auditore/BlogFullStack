var config = require("./config"),
    mongoose = require("mongoose");
    
module.exports = function(){
    var db = mongoose.connect(config.dbUrl,function(err){
        if(err)
            console.log('error connecting to db '+err);
        else{
            console.log('Connected to db');
        }
    });
    return db;
}