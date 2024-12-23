import lists from '../../mockData/lists.js';

const getListById = (req, res) => {
    const userId = res.locals.user?.id;
    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    const { listId } = req.params; // Získáme listId z URL
    const list = lists.find(list => list.id === listId);

    if (!list) return res.status(404).json({ error: "List not found" });

    const userInList = list.users.some(user => user.userId === userId);
    if (!userInList) return res.status(403).json({ error: "Access denied to this list" });

    res.status(200).json(list);
};

export default getListById;
