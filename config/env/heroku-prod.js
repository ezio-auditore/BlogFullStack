/**
 * Created by tonyStark on 1/6/2017.
 */
module.exports ={
    sessionSecret : 'asdgh9346qen136@#@!hssDAJSD',
    dbUrl : 'mongodb://admin:admin@ds149278.mlab.com:49278/blog_full_stack',
    google : {
        clientID :'737063857541-rubjr446km2m9a7m7nmmdvli9iia2vgo.apps.googleusercontent.com' ,
        clientSecret :'6ABWL00OfY-V04e4cABL4Osd',
        callbackURL :'https://stark-blog.herokuapp.com/oauth/google/callback'
    },
    facebook:{
        clientID :'1864017550505218',
        clientSecret : '37380ea978239bb424a1e1c36098269e',
        callbackURL:'https://stark-blog.herokuapp.com/oauth/facebook/callback',
        profileFields: ['id', 'emails', 'first_name', 'last_name', 'gender']
    }
}
