import express from 'express';
import addItemToList from '../controllers/itemController/addItemToList.js';
import updateItem from '../controllers/itemController/updateItem.js';
import deleteItem from '../controllers/itemController/deleteItem.js';

const router = express.Router();

router.post('/', addItemToList);
router.put('/:itemId', updateItem);
router.delete('/:itemId', deleteItem);

export default router;
