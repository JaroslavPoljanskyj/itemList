import { validateCreateList } from '../../validations/listValidations/createListValidation.js';
import lists from '../../mockData/lists.js';

const createList = (req, res) => {
    const { error, value } = validateCreateList(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const list = { ...value, items: [], users: [{ userId: value.ownerId, role: 'Owner' }] };
    lists.push(list);
    res.status(201).json({ message: 'List created successfully', list });
};

export default createList;
