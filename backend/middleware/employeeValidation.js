const Joi = require("joi");

const employeeSchema = Joi.object({

    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),

    email: Joi.string()
        .trim()
        .email()
        .required(),

    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),

    department: Joi.string()
        .trim()
        .required(),

    salary: Joi.number()
        .positive()
        .required()

});

module.exports = employeeSchema;