require("dotenv").config();
//const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

import { db } from "../models";
const { hashPassword, comparePassword } = require("../utils/helpers");
import { validateRegister, validateEvent } from "../validations";


// const register = async (req:any, res:any) => {
//   try {
//     const validateData = validateRegister(req.body);
//     if (validateData.error) {
//       res.status(400);

//       throw new Error(validateData.error.details[0].message);
//     }
//     const { email, fullName, password } = req.body;
//     //check if the user already exists
//     const user = await db.User.findOne({
//       where: { email },
//     });
//     if (user) {
//       throw new Error("User already exists");
//     }
//     let isAdmin;
//     email.indexOf("@mahindra.com") !== -1 ? (isAdmin = true) : false;
//     const { hash, salt } = await hashPassword(password);
//     const newUser = await db.User.create({
//       user_id: uuidv4(),
//       fullName,
//       email,
//       isAdmin: isAdmin,
//       passwordHash: hash,
//       passwordSalt: salt,
//     });
//     delete newUser.dataValues.user_id;
//     delete newUser.dataValues.passwordHash;
//     delete newUser.dataValues.passwordSalt;
//     res.status(201).json({
//       status: true,
//       message: "User created successfully",
//       data: newUser.dataValues,
//     });
//   } catch (err:any) {
//     res.status(401).json({
//       status: false,
//       message: err?.message || "Something went wrong",
//     });
//   }
// };


const signin = async (req: any, res: any) => {
  const { email, account_id, fullName } = req.body;
  try {
    const user = await db.User.findOne({
      where: { email },
    });
    if (!user) {
      await db.User.create({
        user_id: uuidv4(),
        account_id,
        fullName,
        email,
        isAdmin: false,
      });
    }
    delete user.dataValues.user_id;
    delete user.dataValues.id;
    delete user.dataValues.passwordHash;
    delete user.dataValues.paswordSalt;
    const token = jwt.sign(
      {
        email: user.dataValues.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "50d" }
    );

    res.status(201).json({
      status: true,
      message: "User already added",
      data: user.dataValues,
      token,
    });
    return;
  } catch (err: any) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

const addEvent = async (req: any, res: any) => {
  try {
    const { title, location } = req.body;
    const { user_id } = req.params.user;

    const validateData = validateEvent(req.body);
    if (validateData.error) {
      res.status(400);

      throw new Error(validateData.error.details[0].message);
    }
    await db.Event.create({
      event_id: uuidv4(),
      user_id,
      title,
      location,
    });
    res.status(201).json({
      status: true,
      message: "Post already added",
    });
    return;
  } catch (e: any) {
    res.status(400).json({
      status: false,
      message: e.message,
    });
  }
};

const authenticateUser = async (req: any, res: any) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw new Error(`Invalid email`);
    }
    const user = await db.User.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new Error("user not found");
    }
    delete user.dataValues.user_id;
    delete user.dataValues.id;
    delete user.dataValues.passwordHash;
    delete user.dataValues.paswordSalt;
    res.status(200).json({
      status: true,
      data: user.dataValues,
    });
  } catch (err: any) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  signin,
  //register,
  addEvent,
  authenticateUser,
};
