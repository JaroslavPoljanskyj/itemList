import  users  from '../../mockData/users.js';
import bcrypt from 'bcrypt';
import {registerValidation} from '../../validations/userValidations/registerValidation.js';

export default async function registerUser(req, res, next) {
    try {
        const { username, password } = req.body;


        await registerValidation(req.body);


        if (users.find(user => user.username === username)) {
            return res.status(400).json({ message: "User already exists" });
        }


        const passwordHash = await bcrypt.hash(password, 10);


        const newUser = {
            id: users.length + 1,
            username,
            passwordHash,
            isActive: false,
            createdDate: new Date()
        };
        users.push(newUser);

        res.status(201).json({ message: "User registered successfully", user: { id: newUser.id, username: newUser.username } });
    } catch (err) {
        next(err);
    }
}
