import { validateAddItem } from '../../validations/itemValidations/addItemValidation.js';
import lists from '../../mockData/lists.js';

const addItemToList = (req, res) => {
    const { error, value } = validateAddItem(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const list = lists.find(l => l.id === req.params.listId);
    if (!list) return res.status(404).json({ error: 'List not found' });

    list.items.push(value);
    res.status(201).json({ message: 'Item added to list', list });
};

export default addItemToList;
