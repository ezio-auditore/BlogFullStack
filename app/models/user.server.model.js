var mongoose = require("mongoose"),
    crypto = require('crypto'),
    Schema = mongoose.Schema,
    config = require("../../config/config");

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        validate: [function(password) {
            return password.length >= 6;
        }, 'Password should be longer']
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerID: String,
    providerData: {},
    role: {
        type: String,
        enum: ['Admin', 'Owner', 'User'],
        default: 'User'
    },
    gender: {
        type: String,
        default: 'Male'
    },
    image: String,
    profile_pic: String,
    created: {
        type: Date,
        default: Date.now
    }
});
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
}

UserSchema.virtual('fullName').get(function() {
    if (this.provider === 'google') {
        return this.providerData.name.givenName + ' ' + this.lastName;
    }
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        //console.log(this.salt);
        //console.log("before hashing:"+this.password);
        this.password = this.hashPassword(this.password);
        //console.log(this.password);
    }
    this.image = this.image ? this.image : 'http://eightbitavatar.herokuapp.com/?id=' + this._id + '&s=' + this.gender.toLowerCase() + '&size=100';
    this.profile_pic = this.profile_pic ? this.profile_pic : 'http://eightbitavatar.herokuapp.com/?id=' + this._id + '&s=' + this.gender.toLowerCase() + '&size=200';
    next();
});

UserSchema.post('save', function(next) {
    var api_key = config.heroku.api_key;
    var domain = config.heroku.domain;
    var mailgun = require('mailgun-js')({
        apiKey: api_key,
        domain: domain
    });

    var data = {
        from: 'jarvis@starkblog.com',
        to: config.heroku.receiver.split(';')[0],
        cc: config.heroku.receiver.split(';')[1],
        subject: 'New User Signup',
        text: this.email + ' has signed up ' + ' with ' + this.provider
    };

    mailgun.messages().send(data, function(error, body) {
        console.log(body);
    });
});
UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};


UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            }
            else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        }
        else {
            callback(null);
        }
    });
};
UserSchema.set('toJSON', {
    getters: true,
    setters: true
});
mongoose.model("User", UserSchema);
