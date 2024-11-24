import express from 'express';
import createList from '../controllers/listController/createList.js';
import addUserToList from '../controllers/listController/addUserToList.js';
import getLists from "../controllers/listController/getLists.js";
import getListById from "../controllers/listController/getListById.js";
import updateList from "../controllers/listController/updateList.js";
import deleteList from "../controllers/listController/deleteList.js";

const router = express.Router();

router.post('/', createList);
router.post('/:listId/users', addUserToList);
router.get('/', getLists)
router.get('/:listId',getListById)
router.post('/:listId',updateList)
router.delete('/:listId',deleteList)

export default router;
