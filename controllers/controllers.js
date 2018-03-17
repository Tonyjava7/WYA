// Requiring node packages needed
var path = require("path");
var express = require("express");
var firebase = require("firebase");

var router = express.Router();

var driver = require("../models/driver");

var rider = require("../models/rider");

// Line of code that handles the html routes or any invalid paths entered

router.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/newUser.html"));
});

router.get("/driver", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/driver.html"));
});

router.get("/ridingDriver", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/ridingDriver.html"));
});

router.get("/updateInfo", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/updateInfo.html"));
});

/* router.get("/success", function (req, res) {
    console.log(req);

    if (!rider.doesUserExist(req.email, function (result) {
        console.log(req);
    })) {
        res.sendFile(path.join(__dirname, "../views/newUser.html"));
    }
    else if (rider.doesUserExist(user.email, function (result) {
        console.log(req);
    }) && !rider.isDriver(user.email, function (result) {
        console.log(req);
    })) {
        res.sendFile(path.join(__dirname, "../views/rider.html"));
    }
    else {
        res.sendFile(path.join(__dirname, "../views/driver.html"));
    }

}); */

router.post("/addUser", function (req, res) {
    rider.addUser(req.body.firstName, req.body.lastName, req.body.driver, req.body.email, req.body.emergName, req.body.emergNumber, function (result) {
        if (req.body.driver == 1) {
            res.sendFile(path.join(__dirname, "../views/driver.html"));
        }
        else {
            res.sendFile(path.join(__dirname, "../views/rider.html"));
        }
    })

});

router.post("/addRider", function (req, res) {
    driver.addRider(req.body.firstName, req.body.lastName, req.body.fields, function (result) {
        res.json({ id: result.insertId });
    })

});

router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});

module.exports = router;