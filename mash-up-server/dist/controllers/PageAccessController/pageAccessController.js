'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserAccess = getUserAccess;

var _parallel = require('async/parallel');

var _parallel2 = _interopRequireDefault(_parallel);

var _VerifyJWTToken = require('../globalController/VerifyJWTToken');

var _UserManagementModels = require('../../models/UserManagementModels');

var _PageAccessModel = require('../../models/PageAccessModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUserAccess(req, res, next) {
    console.log("called page access controller");
    (0, _VerifyJWTToken.verifyJwtToken)(req.headers['x-auth-token']).then(function (decodedToken) {
        if (decodedToken.user) {
            (0, _parallel2.default)([function (callback) {
                validateToken(req.headers['x-auth-token'], decodedToken.user, callback);
            }, function (callback) {
                findUserAccessForPage(decodedToken.user, req.params.page, callback);
            }], function (err, result) {
                //check if any one is null or error, if error send bad response and if success send the required access.
                if (!err) {
                    if (result[0] && result[1]) {
                        console.log("1");
                        res.send(result[1]);
                    }
                } else {
                    console.log("error");
                }
            });
        }
    });
}

//Helper methods can be added for the main controller functions exposed to the API routes.
function validateToken(token, userEmail, callback) {
    _UserManagementModels.User.findUserByToken(token).then(function (user) {
        if (user != null) {
            if (user.email == userEmail) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        } else {
            callback(null, false);
        }
    }).catch(function (err) {
        callback(err, null);
    });
}

function findUserAccessForPage(email, page, callback) {
    console.log(email + " - " + page);
    //call the model and get the access for the page
    _PageAccessModel.PageAccess.findPageAccessForUser(email, page).then(function (result) {
        console.log("result");
        callback(null, result);
    }).catch(function (err) {
        callback(err, null);
    });
}
//# sourceMappingURL=pageAccessController.js.map