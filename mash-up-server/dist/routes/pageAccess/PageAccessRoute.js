'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _pageAccessController = require('../../controllers/PageAccessController/pageAccessController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageAccess = _express2.default.Router();
PageAccess.get('/', function (req, res, next) {
    res.send({ "title": "Welcome to Page Access Management for all users" });
});

PageAccess.get('/access/:page', [_pageAccessController.getUserAccess], function (req, res, next) {
    console.log("page access call done");
});
module.exports = PageAccess;
//# sourceMappingURL=PageAccessRoute.js.map