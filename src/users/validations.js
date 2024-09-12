import Joi from "joi";

export const loginValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

export const addUserValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    biography: Joi.string().required(),
    size: Joi.number().min(20).max(50).required(),
    giveLikes: Joi.array().items(Joi.string()),
    receiveLikes: Joi.array().items(Joi.string())
})