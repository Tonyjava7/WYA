var orm = require("../config/orm");

var driver = {
    createDriverTable: function(firstName, lastName, cb) {
        var tableName = firstName + lastName;
        queryString = "id int NOT NULL AUTO_INCREMENT, rider_name varchar(255) NOT NULL,";
        queryString += "pickup_location varchar(255) NOT NULL, emergency_contact_name varchar(255) NOT NULL,";
        queryString += "emergency_contact_number varchar(255) NOT NULL)";
        orm.createTable(tableName, queryString, function (res) {
            cb(res);
        });
    },

    pullDriverTable: function(firstName, lastName, cb) {
        var tableName = firstName + lastName;
        orm.select(tableName, "*", function (res) {
            cb(res);
        })
    },

    addRider: function(firstName, lastName, data, cb) {
        var tableName = firstName + lastName;
        orm.create(tableName, Object.keys(data), Object.values(data), function (res) {
            cb(res);
        })
    }
}

module.exports = driver;