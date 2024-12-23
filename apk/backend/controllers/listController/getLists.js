import lists from '../../mockData/lists.js';

const getLists = (req, res) => {
    const userId = res.locals.user?.id;
    console.log("tady je userId pri ziskavani LIstu " + userId)
    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    const userLists = lists.filter(list =>
        list.users.some(user => user.userId === userId)
    );

    res.status(200).json(userLists);
};

export default getLists;
