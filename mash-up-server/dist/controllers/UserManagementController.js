'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initialLoginValidation = initialLoginValidation;
exports.signUserJwtToken = signUserJwtToken;
exports.verifyAndRemoveUser = verifyAndRemoveUser;

var _UserManagementModels = require('../models/UserManagementModels');

var _VerifyJWTToken = require('../controllers/globalController/VerifyJWTToken');

function initialLoginValidation(req, res, next) {
    if (req.body.email == "" || req.body.password.length > 16 || req.body.password.length < 8) {
        res.status(401).send("Not allowed");
    } else {
        _UserManagementModels.User.findUserByEmail(req.body.email).then(function (user) {
            if (!user) {
                res.status(401).send({ "error": true });
            } else {
                _UserManagementModels.User.comparePassword(req.body.password, user.password).then(function (res) {
                    if (!res) {
                        res.send({ "error": true });
                    } else {
                        req.user = { "error": false, "_id": user._id, "email": user.email, "password": user.password, "role": user.role, "organizationCode": user.organizationCode };
                        next();
                    }
                });
            }
        });
    }
}
function signUserJwtToken(req, res, next) {
    if (!req.user.error) {
        var user = new _UserManagementModels.User({ "_id": req.user._id, "email": req.user.email, "password": req.user.password, "role": req.user.role, "organizationCode": req.user.organizationCode });
        user.generateAuthToken().then(function (token) {
            req.cookies.token = token;
            req.token = token;
            next();
        }).catch(function (err) {
            console.log(err);
            res.status(403).send({ "error": "Error while performing action" });
        });
    } else {
        res.status(400).send({ "error": "something went wrong" });
    }
}
function verifyAndRemoveUser(req, res, next) {
    if (req.body.token) {
        _UserManagementModels.User.findUserByToken(req.body.token).then(function (user) {
            if (user !== null && user.email === req.body.email) {
                var loggedInUser = new _UserManagementModels.User(user);
                (0, _VerifyJWTToken.verifyJwtToken)(req.body.token).then(function (decodedToken) {
                    if (decodedToken && decodedToken.user === req.body.email) {
                        loggedInUser.removeToken(req.body.token).then(function (user) {
                            next();
                        }).catch(function (err) {
                            res.status(403).send({ "error": "Action failed" });
                        });
                    } else {
                        res.status(401).send({ "error": "Action failed" });
                    }
                });
            } else {
                res.status(401).send({ "error": "Cannot perform action" });
            }
        }).catch(function (err) {
            res.status(401).send({ "error": "Cannot locate user" });
        });
    } else {
        res.status(401).send({ "error": "Can't perform action" });
    }
}
//# sourceMappingURL=UserManagementController.js.map