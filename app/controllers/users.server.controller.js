exports.create = function(req,res,next){
    var User = require("mongoose").model('User');
    var user = new User(req.body);
    user.save(function(err){
       if(err)
            return next(err);
        else{
            res.json(user);
        }
    });
};

exports.find = function(req,res,next){
    var User = require("mongoose").model('User');
    User.find({},'username email created',function(err,users){
        if(err)
            return next(err);
        else{
            res.json(users);
        }
    })
};
exports.read = function(req,res){
    res.json(req.user);
};
exports.userByID = function(req,res,next,id){
    var User = require("mongoose").model('User');
    User.findOne({
        _id :id,
    },function(err,user){
        if(err)
            return next(err);
        else{
            req.user = user;
            next();
        }
    });
};
exports.update = function(req,res,next){
    var User = require("mongoose").model('User');
    User.findByIdAndUpdate(req.user.id,req.body,function(err,user){
        if(err)
            return next(err);
        else 
            res.json(user);
    });
};

exports.delete = function(req,res,next){
    req.user.remove(function(err){
        if(err)
            return next(err);
        else 
            res.json(req.user);
    });
};




