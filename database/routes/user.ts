import express from "express";
const router = express.Router();
const {
  //register,
  signin,
  addEvent,
  authenticateUser,
} = require("../controllers/user");

const { authorization } = require("../middlewares/authorization");
const isAdmin = require("../middlewares/isAdmin");


//router.post("/register", register);
router.post("/signIn", signin);
router.post("/events/post", authorization, isAdmin, addEvent);
router.get("/user/athenticate", authenticateUser);

module.exports = router;
