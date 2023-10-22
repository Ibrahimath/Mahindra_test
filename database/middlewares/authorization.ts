require("dotenv").config();
import  jwt from "jsonwebtoken";
const { db } = require("../models");

const authorization = (req:any, res:any, next:any) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) throw new Error("Unauthorized Access......");

    const tokenSplit = authorization.split(" ");
    jwt.verify(tokenSplit[1], process.env.JWT_SECRET as string, async (err:any, decoded:any) => {
      if (err) {
        res.status(401).send({
          status: false,
          message: "Unauthorized Acesss",
        });
        return;
      }

      const userData = await db.User.findOne({
        where: { email: decoded.email },
      });
      if (userData == null) {throw new Error("user not found");
     }
      req.params.user = userData.dataValues;
      next();
    });
  } catch (error:any) {
    res.status(401).send({
      status: false,
      message: error.message || "Unauthorized Acesss",
    });
    return;
  }
};

module.exports = {
  authorization
};
