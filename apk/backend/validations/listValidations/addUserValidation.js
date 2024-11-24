import Joi from 'joi';

export const validateAddUser = (data) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        role: Joi.string().valid('Admin', 'User').required(),
    });

    return schema.validate(data);
};
