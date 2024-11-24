import lists from '../../mockData/lists.js';

const deleteList = (req, res) => {
    const userId = res.locals.user?.id;
    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    const { listId } = req.query;
    const listIndex = lists.findIndex(list => list.id === listId);

    if (listIndex === -1) return res.status(404).json({ error: "List not found" });

    const list = lists[listIndex];

    const userInList = list.users.find(user => user.userId === userId);
    if (!userInList || userInList.role !== "Owner") {
        return res.status(403).json({ error: "Only the owner can delete the list" });
    }

    lists.splice(listIndex, 1);
    res.status(200).json({ message: "List deleted successfully" });
};

export default deleteList;
