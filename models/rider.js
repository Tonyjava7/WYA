var orm = require("../config/orm");

var rider = {
    pullQrCode: function(email, cb) {
        orm.selectWhere("users", "qr_code", "email", email, function (res) {
            cb(res);
        });
    },

    pullUser: function(email, cb) {
        orm.selectWhere("users", "*", "email", email, function (res) {
            cb(res)
        });
    },

    doesUserExist: function(email, cb) {
        orm.doesExist("users", "email", email, function (res) {
            cb(res);
        })
    },

    addUser: function(first, last, driver, email, contactName, contactNumber, cb) {
        var colArray = ["first_name", "last_name", "driver", "email", "emergency_contact_name", "emergency_contact_number"];
        var valueArray = [first, last, driver, email, contactName, contactNumber];
        orm.create("users", colArray, valueArray, function (res) {
            cb(res);
        })
    },

    isDriver: function (email, cb) {
        orm.selectWhere("users", "driver", "email", email, function (res) {
            cb(res);
        })
    }
}

module.exports = rider;