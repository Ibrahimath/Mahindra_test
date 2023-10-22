"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
//const { Op } = require("sequelize");
var uuidv4 = require("uuid").v4;
var jwt = require("jsonwebtoken");
var models_1 = require("../models");
console.log("aaaaaaaa", models_1.db.User);
var _a = require("../utils/helpers"), hashPassword = _a.hashPassword, comparePassword = _a.comparePassword;
var validations_1 = require("../validations");
var signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, account_id, fullName, user, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, account_id = _a.account_id, fullName = _a.fullName;
                return [4 /*yield*/, models_1.db.User.findOne({
                        where: { email: email },
                    })];
            case 1:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 3];
                return [4 /*yield*/, models_1.db.User.create({
                        user_id: uuidv4(),
                        account_id: account_id,
                        fullName: fullName,
                        email: email,
                        isAdmin: false,
                    })];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                delete user.dataValues.user_id;
                delete user.dataValues.id;
                token = jwt.sign({
                    email: user.dataValues.email,
                }, process.env.JWT_SECRET, { expiresIn: "10d" });
                res.status(201).json({
                    status: true,
                    message: "User already added",
                    data: user.dataValues,
                    token: token
                });
                return [2 /*return*/];
        }
    });
}); };
var addEvent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, location_1, user_id, validateData, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, location_1 = _a.location;
                user_id = req.params.user.user_id;
                validateData = (0, validations_1.validateEvent)(req.body);
                if (validateData.error) {
                    res.status(400);
                    throw new Error(validateData.error.details[0].message);
                }
                return [4 /*yield*/, models_1.db.Event.create({
                        event_id: uuidv4(),
                        user_id: user_id,
                        title: title,
                        location: location_1
                    })];
            case 1:
                _b.sent();
                res.status(201).json({
                    status: true,
                    message: "Post already added"
                });
                return [2 /*return*/];
            case 2:
                e_1 = _b.sent();
                res.status(400).json({
                    status: false,
                    message: e_1.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    signin: signin,
    //register,
    addEvent: addEvent
};
