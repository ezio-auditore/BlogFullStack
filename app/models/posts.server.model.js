var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

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

mongoose.model('Post', PostSchema);
