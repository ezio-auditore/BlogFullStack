var firebase = require("firebase");
var config = require("./config");
var firebaseConfig = {

    apiKey: config.firebase.api_key,
    authDomain: config.firebase.authDomain,
    databaseURL: "https://stark-blog-154810.firebaseio.com"
}


module.exports = firebase.initializeApp(firebaseConfig);

/*function writeUserData(userId) {
    firebase.database().ref('users/' + userId).set({
        username: "Tony",
        email: "tony@asd.com"
    });
}


writeUserData("dastaan93");
var starCountRef = firebase.database().ref('users/' + 'dastaan93' + '/username');
starCountRef.on('value', function(snapshot) {
    console.log(snapshot.val());
});*/
