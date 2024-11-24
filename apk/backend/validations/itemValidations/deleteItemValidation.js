import Joi from 'joi';

export const validateDeleteItem = (data) => {
    const schema = Joi.object({
        id: Joi.string().required(),
    });

    return schema.validate(data);
};
