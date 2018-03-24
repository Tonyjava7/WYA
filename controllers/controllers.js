// Requiring node packages needed
var path = require("path");
var express = require("express");
var firebase = require("firebase");
var moment = require('moment');
var sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var helper = require('sendgrid').mail;

var router = express.Router();

var driver = require("../models/driver");
var rider = require("../models/rider");

// Line of code that handles the html routes or any invalid paths entered

router.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/success.html"));
});

router.get("/driver", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/driver.html"));
});

router.get("/rider", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/rider.html"));
});

router.get("/newUser", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/newUser.html"));
});

router.get("/ridingDriver", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/ridingDriver.html"));
});

router.get("/updateInfo", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/updateInfo.html"));
});

router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/login.html"));
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

router.post("/api/riders/:studentId", function (req, res) {
    rider.pullUserByStudentId(req.params.studentId, function (data) {
        res.json(data);

        console.log(data[0].email);
        var time = moment().format('MMMM Do YYYY, h:mm:ss a');


        var from_email = new helper.Email('info@WYA.com');
        var to_email = new helper.Email(data[0].email);
        var subject = 'Public School bus alert';
        var content = new helper.Content('text/plain', data[0].first_name + " " + data[0].last_name + ' has been scanned on the bus at ' + time);
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, function (error, response) {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
        });
    });

    router.post("/api/riders/email/:email", function (req, res) {
        rider.pullUserByEmail(req.params.email, function (data) {
            console.log(data);
            res.send(data);
        });
    });
});

router.post("/api/riders/:first_name", function (req, res) {
    rider.pullUsername(req.params.first_name, function (data) {
        res.json(data);

        console.log(data);

    });
});

router.post("/api/riders", function (req, res) {
    var studentId = parseInt(Math.floor(Math.random() * 9000000000) + 1000000000);
    rider.addUser(["first_name", "last_name", "email", "emergency_contact_name", "emergency_contact_number", "studentId"],
        [req.body.firstName, req.body.lastName, req.body.email, req.body.emergName, req.body.emergNumber, studentId], function (data) {
            if (req.body.driver == 1) {
                res.sendFile(path.join(__dirname, "../views/driver.html"));
            }
            else {
                res.sendFile(path.join(__dirname, "../views/rider.html"));
            }
        })
});

router.post("/addRider", function (req, res) {
    driver.pullUserByStudentId(req.body.id, function (result) {
        res.send(result);
    })

});

router.post("/updateInfo", function (req, res) {
    var condition = "email = '" + req.body.userEmail + "'";
    var objColVals = {};
    objColVals[req.body.databaseEdit] = "'" + req.body.valEdit + "'";
    console.log(objColVals);
    if (req.body.userIsDriver) {
        driver.updateUser(objColVals, condition, function (result) {
            if (result.changedRows == 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();

            }
        });
    }
    else {
        rider.updateUser(objColVals, condition, function (result) {
            if (result.changedRows == 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
    }
});

router.post("/isDriver", function (req, res) {
    rider.isDriver(req.body.userEmail, function (result) {
        res.send({ result })
    })
});

router.post("/pullDriverUser", function (req, res) {
    rider.pullUserByEmail(req.body.userEmail, function (result) {
        console.log(result);
        res.send({ result });
    })
});

router.post("/pullRiderUser", function (req, res) {
    rider.pullUserByEmail(req.body.userEmail, function (result) {
        res.send({ result });
    })
});

module.exports = router;