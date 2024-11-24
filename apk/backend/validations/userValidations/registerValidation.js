import Joi from 'joi';

export const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(6).max(50).required()
    });

    return schema.validateAsync(data);
};
