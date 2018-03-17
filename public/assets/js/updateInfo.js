$(document).ready(function () {
    var driver = require("../models/driver");
    var rider = require("../models/rider");
    var firebase = require("firebase"); 
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
        console.log(user);
        if (user) {
            console.log(user);
            var userFirst = '';
            var userLast = '';
            var userDriver = '';
            var userEmail = '';
            var userEmergName = '';
            var userEmergNumb = '';
            event.preventDefault();
            var email = user.email;
            console.log(email);
            var driver = rider.isDriver(email, function (res) {
                console.log(res);
                if (res) {
                    driver.pullUser(email, function (result) {
                        console.log(result);
                        var labelArray = ["First Name: ", "Last Name: ", "Email: ", "Emergency Contact Name", "Emergency Contact Number: "];
                        var resultArray = [result.first_name, result.last_name, result.driver, result.email, result.emergency_contact_name, result.emergency_contact_number];
                        var currentInfo = $("#currentInfo");
                        for (i = 0; i < labelArray.length; i++) {
                            var span = $("<div>");
                            span.text(labelArray[i] + ": " + resultArray[i]);
                            currentInfo.append(span);
                        }
                    });
                }
            });
        }
        else {
            console.log("You are logged out. Log in and try again.");
        }
    });
})