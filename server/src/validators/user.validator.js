import Joi from "joi";

export const registerUserValidator = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

export const loginUserValidator = Joi.object({
  userName: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().required(),
});
 