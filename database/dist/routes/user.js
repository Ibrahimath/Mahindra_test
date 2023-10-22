"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var _a = require("../controllers/user"), 
//register,
signin = _a.signin, addEvent = _a.addEvent;
var authorization = require("../middlewares/authorization").authorization;
var isAdmin = require("../middlewares/isAdmin");
//router.post("/register", register);
router.post("/signIn", signin);
router.post("/events/post", authorization, isAdmin, addEvent);
module.exports = router;
