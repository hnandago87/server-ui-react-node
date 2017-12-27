'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _DbConfig = require('./DbConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
var mongooseConnection = _mongoose2.default.connect(_DbConfig.mongoURL);
exports.default = { mongooseConnection: mongooseConnection };

//Madan and Hari password --> Gerrard_08 and hash is "$2a$10$NhmWT1PIfewk5fW0IugBR.cZLtfBBffIH3bt9foteoCTaHGF3XreK"
// JWT secret key -->MashUpJWTSuperSecretKey_Created@_Dec,26^th,2017. and hash is "$2a$10$0mSSOdLdjtdZjh4hCYGxCe2hSlyvM95JvJ3Cj7W.JEy9NmjUO9RXq"
//# sourceMappingURL=MongoDbConfig.js.map