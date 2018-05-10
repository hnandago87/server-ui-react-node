'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _MongoDbConfig = require('../globals/MongoDbConfig');

var _underscore = require('underscore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validator = require('validator');

var pageAccessSchema = new _mongoose2.default.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Not a valid email"
        }
    },
    pageAccess: [{
        pageName: {
            type: String,
            required: true
        },
        access: {
            defaultView: {
                type: String,
                required: true
            },
            switchable: {
                type: Boolean,
                default: false
            },
            switchablePages: {
                type: [String],
                required: true
            }
        }

    }]
});
pageAccessSchema.methods.removeAccess = function (pageAccess) {
    var user = this;
    var updtedAccess = user.pageAccess.map(function (page) {
        if (page.pageName == pageAccess.pageName) {
            page.access = pageAccess.access;
        }
    });
    user.pageAccess = updatedAccess;
    return user.save().then(function (result) {
        return result;
    });
};
pageAccessSchema.methods.addAccess = function (pageAccess) {
    var user = this;
    var numberOfPages = user.pageAccess.length;
    if ((0, _underscore.where)(user.pageAccess, pageAccess).length == 0) {
        user.pageAccess.push(pageAccess);
    }
    if (numberOfPages < user.pageAccess.length) {
        return user.save().then(function (result) {
            return result;
        });
    } else {
        return 0;
    }
};
pageAccessSchema.statics.findUserByEmail = function (email) {
    var user = this;
    return user.findOne({ "_id": email });
};
pageAccessSchema.statics.findPageAccessForUser = function (email, pageName) {
    var user = this;
    return user.findOne({ "_id": email }).then(function (result) {
        console.log(result);
        if (result) {
            return (0, _underscore.find)(result.pageAccess, function (access) {
                return access.pageName == pageName;
            });
        }
    });
};

var PageAccess = _mongoose2.default.model('PageAccess', pageAccessSchema, 'pageAccess');
module.exports = { PageAccess: PageAccess };
//# sourceMappingURL=PageAccessModel.js.map