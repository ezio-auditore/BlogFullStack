/**
 * Created by tonyStark on 1/6/2017.
 */
module.exports = {
    sessionSecret: 'asdgh9346qen136@#@!hssDAJSD',
    dbUrl: 'mongodb://admin:admin@ds149278.mlab.com:49278/blog_full_stack',
    google: {
        clientID: '737063857541-rubjr446km2m9a7m7nmmdvli9iia2vgo.apps.googleusercontent.com',
        clientSecret: '6ABWL00OfY-V04e4cABL4Osd',
        callbackURL: 'https://stark-blog-development.herokuapp.com/oauth/google/callback'
    },
    facebook: {
        clientID: '1864017550505218',
        clientSecret: '37380ea978239bb424a1e1c36098269e',
        callbackURL: 'https://stark-blog-development.herokuapp.com/oauth/facebook/callback',
        profileFields: ['id', 'emails', 'first_name', 'last_name', 'gender', 'photos']
    },
    heroku: {
        api_key: 'key-8042677eb9a30aad077d4ac0278267ae',
        domain: 'app5e2ddfde8a004ceb88d4f081d5f389e8.mailgun.org',
        receiver: 'pupunmajumder@gmail.com;chatterjeedebjani93@yahoo.com'
    },
    firebase: {
        api_key: 'AIzaSyCrcPtjC7uhifW_Mdwh0cDcNxumWMfOmj8',
        authDomain: 'stark-blog-154810'
    }
}
