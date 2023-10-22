"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEvent = exports.validateRegister = void 0;
var Joi = require("joi");
var validateRegister = function (user) {
    var schema = Joi.object({
        fullName: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        isAdmin: Joi.bool(),
    });
    return schema.validate(user);
};
exports.validateRegister = validateRegister;
var validateEvent = function (user) {
    var schema = Joi.object({
        title: Joi.string().min(3).required(),
        location: Joi.string().required()
    });
    return schema.validate(user);
};
exports.validateEvent = validateEvent;
