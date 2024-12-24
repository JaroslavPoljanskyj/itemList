import lists from '../../mockData/lists.js';

const updateList = (req, res) => {
    const userId = res.locals.user?.id;
    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    const { listId } = req.params;
    const list = lists.find(list => list.id === listId);

    if (!list) return res.status(404).json({ error: "List not found" });

    const userInList = list.users.find(user => user.userId === userId);
    if (!userInList || userInList.role !== "Owner") {
        return res.status(403).json({ error: "Only the owner can modify the list" });
    }

    if (req.body.name) list.name = req.body.name;
    if (req.body.items) list.items = req.body.items;

    res.status(200).json({ message: "List updated", list });
};

export default updateList;
