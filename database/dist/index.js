"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// packages
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var body_parser_1 = __importDefault(require("body-parser"));
var models_1 = require("./models");
var cors = require("cors");
var port = process.env.PORT || 3100;
var userRoutes = require("./routes/user");
//const adminRoutes = require("./routes/admin");
app.use(body_parser_1.default.json());
app.use(cors());
app.use("/api/v1", userRoutes);
//app.use("/api/v1/admin", adminRoutes);
app.use(function (req, res) {
    res.status(404).json({
        status: false,
        message: "page not found",
    });
});
models_1.sequelize.authenticate().then(app.listen(port, function () {
    console.log("running on port ".concat(port));
}));
module.exports = app;
