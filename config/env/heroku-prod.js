/**
 * Created by tonyStark on 1/6/2017.
 */
module.exports = {
    sessionSecret: 'asdgh9346qen136guyu6@#@!hssDAJSD',
    dbUrl: 'mongodb://admin:admin@ds149278.mlab.com:49278/blog_full_stack',
    google: {
        clientID: '737063857541-rubjr446km2m9a7m7nmmdvli9iia2vgo.apps.googleusercontent.com',
        clientSecret: '6ABWL00OfY-V04e4cABL4Osd',
        callbackURL: 'https://stark-blog.herokuapp.com/oauth/google/callback'
    },
    facebook: {
        clientID: '1749227905403953',
        clientSecret: '0748daf7cb83475cc7cb90d92adb00ce',
        callbackURL: 'https://stark-blog.herokuapp.com/oauth/facebook/callback',
        profileFields: ['id', 'emails', 'first_name', 'last_name', 'gender', 'photos']
    },
    heroku: {
        api_key: 'key-e603bc0f2eb0205d894656e8639981c6',
        domain: 'app7b039cf806744803aabb63cef2a8ea5e.mailgun.org',
        receiver: 'pupunmajumder@gmail.com;chatterjeedebjani93@yahoo.com'
    },
    firebase: {
        api_key: 'AIzaSyCrcPtjC7uhifW_Mdwh0cDcNxumWMfOmj8',
        authDomain: 'stark-blog-154810'
    }
};
