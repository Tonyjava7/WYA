var orm = require("../config/orm");

var rider = {
    pullQrCode: function(id, cb) {
        orm.selectWhere("users", "*", "rider_id", id, function (res) {
            cb(res);
        });
    },

   
    pullUser: function(studentId, cb) {
        orm.selectWhere(studentId, function (res) {
            cb(res)
        });
    },
    pullUserName: function(first_name, cb) {
        orm.selectWhere2(first_name, function (res) {
            cb(res)
        });
    },

    doesUserExist: function(email, cb) {
        orm.doesExist("users", "email", email, function (res) {
            cb(res);
        })
    },

    addUser: function(first, last,  email, contactName, contactNumber,studentId, cb) {
        var studentId =Math.floor(Math.random() * 9000000000) + 1000000000;
       var colArray = ["first_name", "last_name",  "email", "emergency_contact_name", "emergency_contact_number","studentId"];
       var valueArray = [first, last,  email, contactName, contactNumber,studentId];
       orm.create("users", colArray, valueArray, function (res) {
           cb(res);
       })
   },

    isDriver: function (email, cb) {
        orm.selectWhere("users", "driver", "email", email, function (res) {
            cb(res);
        })
    },

    updateUser: function(objColVals, condition, cb) {
        orm.update("users", objColVals, condition, function (res) {
            cb(res)
        });
    }
}

module.exports = rider;