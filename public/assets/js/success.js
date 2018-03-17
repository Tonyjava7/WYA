$(document).ready(function () {

    // Initializing Firebase
    var config = {
        apiKey: "AIzaSyD9Z4QSlx1pOPRUurwF19-RJjAV9E0mI2w",
        authDomain: "where-ya-at-8a1b1.firebaseapp.com",
        databaseURL: "https://where-ya-at-8a1b1.firebaseio.com",
        projectId: "where-ya-at-8a1b1",
        storageBucket: "where-ya-at-8a1b1.appspot.com",
        messagingSenderId: "667593757795"
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            event.preventDefault();
            var email = user.email;
            console.log(user);
            $.ajax("/success", {
                type: "GET",
                data: email
            }).then(function(res) {
                console.log(res);
            })
        }
        else {
            console.log("You are logged out. Log in and try again.");
        }
    });
})