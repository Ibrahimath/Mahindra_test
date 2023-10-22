const Joi = require("joi");

const validateRegister = (user:any) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    isAdmin: Joi.bool(),
  });
  return schema.validate(user);
};

const validateEvent =(user:any) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    location: Joi.string().required()
  });
  return schema.validate(user);
};


export {
  validateRegister,
  validateEvent
};
