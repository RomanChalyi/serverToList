require("@babel/register")({ extensions: [".js", ".ts"] });
require("dotenv").config();

module.exports = require("./index");
