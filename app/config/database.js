const { Client } = require("pg");
var mothods = {};
const conf = function () {
    const client = new Client({
        password: "root",
        user: "root",
        host: "postgres",
    });
    return client
}

exports.data = conf();
