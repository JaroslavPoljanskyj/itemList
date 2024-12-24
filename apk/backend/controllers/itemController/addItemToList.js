import { validateAddItem } from '../../validations/itemValidations/addItemValidation.js';
import lists from '../../mockData/lists.js';

const addItemToList = (req, res) => {
    const { error, value } = validateAddItem(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const list = lists.find(l => l.id === req.body.listId);
    if (!list) return res.status(404).json({ error: 'List not found' });

    // Odstranění id z value
    const { listId, ...itemWithoutId } = value;

    // Přidání položky do seznamu
    list.items.push(itemWithoutId);
    res.status(201).json({ message: 'Item added to list', list });
};

export default addItemToList;
