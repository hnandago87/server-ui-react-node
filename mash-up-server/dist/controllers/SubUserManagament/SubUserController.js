'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateAdminRole = validateAdminRole;

var _UserManagementModels = require('../models/UserManagementModels');

var _VerifyJWTToken = require('../controllers/globalController/VerifyJWTToken');

function validateAdminRole(req, res, next) {
    (0, _VerifyJWTToken.verifyJwtToken)(req.headers['x-auth-token']).then(function (data) {
        if (data.role === "SuperAdmin") {
            next();
        } else {
            res.send({ "error": "denied" });
        }
    });
}
//# sourceMappingURL=SubUserController.js.map