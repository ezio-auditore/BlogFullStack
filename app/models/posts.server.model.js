var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    firebase = require("firebase");

var database = firebase.database();

var PostSchema = new Schema({
    title: {
        type: String,
        trim: true,
        default: '',
        required: 'Title cannot be blank'
    },
    content: {
        type: String,
        default: '',
        trim: true,
        required: true
    },
    like: {
        likeCount: {
            type: Number,
            default: 0,
        },
        likedBy: [{
            type: Schema.ObjectId,
            ref: 'User',
        }]
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    created: {
        type: Date,
        default: Date.now
    }
});
PostSchema.post('save', function() {
    var post = this;
    var postList = database.ref('posts/' + post._id);
    postList.once('value', function(snapshot) {
        if ((snapshot.val() == null)) {
            var newPostRef = database.ref('posts/' + post._id + '/').push();
            var firebasePost = {
                'author': post.author.id,
                'title': post.title,
                'content': post.content,
                'like': {

                    likeCount: post.like.likeCount
                }
            };

            newPostRef.set(firebasePost);
        }
        else {
            var oldPostRef = database.ref('posts/' + post._id);
            var firebasePost = {
                'author': post.author.id,
                'title': post.title,
                'content': post.content,
                'like': {
                    'likedBy': post.like.likedBy.filter(getAuthorIdfromList),
                    'likeCount': post.like.likeCount
                }
            }
            oldPostRef.set(firebasePost);
        }
    });


});
var getAuthorIdfromList = function(author) {
    return author.id;
}

PostSchema.pre('remove', function(next) {
    var oldPostRef = database.ref('posts/' + this._id)
    oldPostRef.remove();
    next();
})
mongoose.model('Post', PostSchema);
