'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _MongoDbConfig = require('../globals/MongoDbConfig');

var _DbConfig = require('../globals/DbConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validator = require('validator');
var bcrypt = require('bcryptjs');
var randomstring = require("randomstring");
var jwt = require('jsonwebtoken');


var userSchema = new _mongoose2.default.Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Not a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    role: {
        type: String,
        required: false
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});
userSchema.methods.generateAuthToken = function () {
    var user = this;
    user.isNew = false;
    var access = randomstring.generate({
        length: 12,
        charset: 'alphanumeric'
    });
    var token = jwt.sign({ "user": user.email, "role": user.role, access: access }, _DbConfig.JWTSecret).toString();
    user.tokens.push({ access: access, token: token });
    return user.save().then(function () {
        return token;
    });
};
userSchema.methods.removeToken = function (token) {
    var user = this;
    user.tokens = user.tokens.filter(function (el) {
        return el.token != token;
    });
    return user.save().then(function () {
        return result;
    });
};
userSchema.statics.findUserByEmail = function (email) {
    var User = this;
    return User.findOne({ "email": email });
};
userSchema.statics.comparePassword = function (clientPassword, hashedPassword) {
    return bcrypt.compare(clientPassword, hashedPassword);
};

userSchema.statics.findUserByToken = function (token) {
    var User = this;
    return User.findOne({ "tokens.token": token });
};
var User = _mongoose2.default.model('User', userSchema, 'userLogin');

module.exports = { User: User };
//# sourceMappingURL=UserManagementModels.js.map