import express from 'express';
import registerUser from '../controllers/userController/registerUser.js';
import loginUser from '../controllers/userController/loginUser.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
