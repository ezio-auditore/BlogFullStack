exports.create = function(req,res,next){
    var Post = require("mongoose").model('Post');
    var post = new Post(req.body);
    
    post.save(function(err){
        if(err)
            return next(err);
        else{
            res.json(post);
            
        }
    });
    
};