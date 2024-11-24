import Joi from 'joi';

export const validateUpdateItem = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).optional(),
        quantity: Joi.number().integer().min(1).optional(),
    });

    return schema.validate(data);
};
