const Joi = require('joi');

// schema para la validación
const createBookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().integer().min(0).required(),
    pages: Joi.number().integer().min(0).required(),
    unit: Joi.number().integer().min(0).required(),
});

const updateBookSchema = Joi.object({
    title: Joi.string(),
    author: Joi.string(),
    category: Joi.string(),
    description: Joi.string(),
    price: Joi.number().integer().min(0),
    pages: Joi.number().integer().min(0),
    unit: Joi.number().integer().min(0),
});

const validateMiddlewareCreate  = (req, res, next) => {
    const { error } = createBookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error });
    }
    next();
}

const validateMiddlewareUpdate  = (req, res, next) => { //Para que lo haga mi amorsito
    const { error } = updateBookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error });
    }
    next();
};
module.exports = {
    validateMiddlewareCreate,
    validateMiddlewareUpdate
}