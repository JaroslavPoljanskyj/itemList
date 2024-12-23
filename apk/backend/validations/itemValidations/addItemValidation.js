import Joi from 'joi';

export const validateAddItem = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.number().integer().min(1).required(),
    });

    return schema.validate(data);
};
