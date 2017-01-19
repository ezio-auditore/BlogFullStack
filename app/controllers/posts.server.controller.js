exports.create = function(req, res) {
    var Post = require("mongoose").model('Post');
    var post = new Post(req.body);
    post.author = req.user;

    post.save(function(err) {
        if (err)
            return res.status(400).send({
                message: getErrorMessages(err)
            });
        else {
            Post.findOne(
                post._id
            ).populate('author', 'firstName lastName fullName image profile_pic').exec(function(err, posts) {
                if (err)
                    return res.status(400).send({
                        message: getErrorMessages(err)
                    });
                else {

                    return res.json({
                        'data': posts
                    });
                }
            });


        }
    });

};

exports.list = function(req, res) {
    var Post = require("mongoose").model('Post');
    Post.find().sort('-created').populate('author', 'firstName lastName fullName image profile_pic').exec(function(err, posts) {
        if (err)
            return res.status(400).send({
                message: getErrorMessages(err)
            });
        else {
            return res.json(posts);
        }
    });
};

exports.postbyID = function(req, res, next, id) {
    var Post = require("mongoose").model('Post');
    console.log(id);
    Post.findOne({
        _id: id
    }).populate('author', 'firstName lastName fullName image profile_pic').exec(function(err, post) {
        if (err)
            return next(err);
        if (!post) return next(new Error('Failed to load post ' + id));

        else {
            req.post = post;
            next();
        }
    });
};


exports.read = function(req, res) {
    res.json(req.post);
};

exports.update = function(req, res) {
    var post = req.post;
    post.title = req.body.title;
    post.content = req.body.content;

    post.save(function(err) {
        if (err)
            return res.status(400).send({
                message: getErrorMessages(err)
            });
        else {
            res.json(post);
        }
    });
};
exports.updateLikes = function(req, res) {
    var Post = require("mongoose").model('Post');
    Post.findOne(req.post).exec(function(err, post) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessages(err)
            });
        }
        else {
            post.like.likeCount++;
            post.like.likedBy.push(req.user);
            post.save(function(err) {
                if (err)
                    return res.status(400).send({
                        message: getErrorMessages(err)
                    });
                else {
                    res.json(post);
                }
            });
        }
    });
}





exports.delete = function(req, res) {
    var post = req.post;
    post.remove(function(err) {
        if (err)
            return res.status(400).send({
                message: getErrorMessages(err)
            });
        else {
            res.json(post);
        }
    });
}

var getErrorMessages = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (errName.message)
                return errName.message;
        }
    }
    return 'Unkown Server Error';
};

exports.hasAuthorization = function(req, res, next) {
    if (req.post.author.id != req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
}
