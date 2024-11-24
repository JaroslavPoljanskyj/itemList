import { validateDeleteItem } from '../../validations/itemValidations/deleteItemValidation.js';
import lists from '../../mockData/lists.js';

const deleteItem = (req, res) => {
    const list = lists.find(l => l.id === req.params.listId);
    if (!list) return res.status(404).json({ error: 'List not found' });

    const index = list.items.findIndex(i => i.id === req.params.itemId);
    if (index === -1) return res.status(404).json({ error: 'Item not found' });

    list.items.splice(index, 1);
    res.status(200).json({ message: 'Item deleted' });
};

export default deleteItem;
