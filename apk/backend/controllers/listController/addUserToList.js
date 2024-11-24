import lists from '../../mockData/lists.js';
const addUserToList = (req, res) => {
    const userId = res.locals.user?.id;
    const { listId } = req.query;
    const { userId: newUserId, role } = req.body;

    // Najdeme seznam
    const list = lists.find((l) => l.id === listId);
    if (!list) return res.status(404).json({ error: "List not found" });

    // Ověříme, že aktuální uživatel má přístup k seznamu
    const currentUserInList = list.users.find((user) => user.userId === userId);
    if (!currentUserInList) {
        return res.status(403).json({ error: "You are not assigned to this list" });
    }

    // Kontrolujeme roli v rámci seznamu
    if (
        currentUserInList.role === "Owner" ||
        (currentUserInList.role === "Admin" && role === "User")
    ) {
        // Přidáme nového uživatele do seznamu
        list.users.push({ userId: newUserId, role });
        return res.status(200).json({ message: "User added to list", list });
    }

    return res.status(403).json({ error: "You do not have permission to add this user role" });
};

export default addUserToList;
