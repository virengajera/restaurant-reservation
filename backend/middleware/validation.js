const Joi = require('joi')

const validateOptions = { abortEarly: false, allowUnknown: true }

const loginSchema = Joi.object({
    
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string().required(),

    user: Joi.string().valid('customer', 'restaurantowner', 'waiter', 'admin').required(),

})


const registerSchema = Joi.object({

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    confirmpassword: Joi.valid(Joi.ref('password')).required(),

    user: Joi.string().valid('customer', 'restaurantowner').required(),

    firstname: Joi.string().required()

})

module.exports.validateLogin = function (req, res, next) {

    const { error, value } = loginSchema.validate(req.body, validateOptions)

    if (error) {
        return res.status(422).json({ status: "Failure", msg: error.details })
    }

    return next()

}

module.exports.validateRegister = function (req, res, next) {

    const { error, value } = registerSchema.validate(req.body, validateOptions)

    if (error) {
        return res.status(422).json({ status: "Failure", msg: error.details })
    }

    return next()
}