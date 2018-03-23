var orm = require("../config/orm");

var rider = {
    pullUserByStudentId: function (studentId, cb) {
        orm.selectWhere("users", "*", "studentId", studentId, function (res) {
            cb(res)
        });
    },

    pullUserByEmail: function (email, cb) {
        orm.selectWhere("users", "*", "email", email, function (res) {
            cb(res)
        });
    },

    pullUserName: function (first_name, cb) {
        orm.selectWhere("users", "*", "first_name", first_name, function (res) {
            cb(res)
        });
    },

    doesUserExist: function (email, cb) {
        orm.doesExist("users", "email", email, function (res) {
            cb(res);
        })
    },

    addUser: function (colArray, valueArray, cb) {
        orm.create("users", colArray, valueArray, function (res) {
            cb(res);
        })
    },

    isDriver: function (email, cb) {
        orm.selectWhere("users", "driver", "email", email, function (res) {
            cb(res);
        })
    },

    updateUser: function (objColVals, condition, cb) {
        orm.update("users", objColVals, condition, function (res) {
            cb(res)
        });
    }
}

module.exports = rider;