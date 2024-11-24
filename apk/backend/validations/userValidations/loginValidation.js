import Joi from 'joi';

export const validateLoginUser = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });

    return schema.validateAsync(data);
};
