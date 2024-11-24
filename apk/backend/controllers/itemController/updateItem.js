import { validateUpdateItem } from '../../validations/itemValidations/updateItemValidation.js';
import lists from '../../mockData/lists.js';

const updateItem = (req, res) => {
    const { error, value } = validateUpdateItem(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const list = lists.find(l => l.id === req.params.listId);
    if (!list) return res.status(404).json({ error: 'List not found' });

    const item = list.items.find(i => i.id === req.params.itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    Object.assign(item, value);
    res.status(200).json({ message: 'Item updated', item });
};

export default updateItem;
