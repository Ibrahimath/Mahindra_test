'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.db = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Sequelize = require('sequelize');
var process_1 = __importDefault(require("process"));
var basename = path_1.default.basename(__filename);
var env = process_1.default.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};
exports.db = db;
var sequelize;
if (config.use_env_variable) {
    exports.sequelize = sequelize = new Sequelize(process_1.default.env[config.use_env_variable], config);
}
else {
    exports.sequelize = sequelize = new Sequelize(config.database, config.username, config.password, config);
}
fs_1.default
    .readdirSync(__dirname)
    .filter(function (file) {
    return ((file === null || file === void 0 ? void 0 : file.indexOf('.')) !== 0 &&
        file !== basename &&
        (file === null || file === void 0 ? void 0 : file.slice(-3)) === '.js' &&
        (file === null || file === void 0 ? void 0 : file.indexOf('.test.js')) === -1);
})
    .forEach(function (file) {
    var model = require(path_1.default.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
