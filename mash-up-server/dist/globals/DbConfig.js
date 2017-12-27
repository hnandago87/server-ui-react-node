"use strict";

var secretKey = "286a9c2f279029936bfebfdb0afc4941b0064128c74b98af0e7764dfb9f0a3c2";
var saveUninitialized = true;
var resave = true;
var mongoURL = "mongodb://localhost/mashUpDB";
var JWTSecret = "$2a$10$0mSSOdLdjtdZjh4hCYGxCe2hSlyvM95JvJ3Cj7W.JEy9NmjUO9RXq";

module.exports = { secretKey: secretKey, saveUninitialized: saveUninitialized, resave: resave, mongoURL: mongoURL, JWTSecret: JWTSecret

    //Make it readonly by using object.defineProperty

};
//# sourceMappingURL=DbConfig.js.map