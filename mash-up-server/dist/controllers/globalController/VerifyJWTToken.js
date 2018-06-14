'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyJwtToken = verifyJwtToken;
exports.findProject = findProject;
exports.removeFromArray = removeFromArray;

var _underscore = require('underscore');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _DbConfig = require('../../globals/DbConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verifyJwtToken(token) {
    return new Promise(function (resolve, reject) {
        _jsonwebtoken2.default.verify(token, _DbConfig.JWTSecret, function (err, decodedToken) {
            if (err || !decodedToken) {
                return reject(err);
            }
            return resolve(decodedToken);
        });
    });
}

function findProject(projects, projectId, identifier) {
    return projects.findIndex(function (project) {
        return project[identifier] == projectId;
    });
}

function removeFromArray(members, name) {
    return (0, _underscore.without)(members, (0, _underscore.findWhere)(member, {
        name: name
    }));
}
//# sourceMappingURL=VerifyJWTToken.js.map