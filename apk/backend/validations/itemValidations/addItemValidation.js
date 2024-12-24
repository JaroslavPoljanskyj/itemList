import Joi from 'joi';

export const validateAddItem = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(3).max(50).required(),
        author: Joi.string(),
        isDone: Joi.boolean(),
        listId: Joi.string()
    });

    return schema.validate(data);
};
