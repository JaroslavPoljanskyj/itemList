import jwt from "jsonwebtoken";
import lists from "../../mockData/lists.js";
import { validateCreateList } from '../../validations/listValidations/createListValidation.js';

const createList = (req, res) => {
    try {
        // Získání tokenu z cookies
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(403).json({ message: "Token is required" });
        }

        // Ověření a dekódování JWT tokenu
        jwt.verify(token, "secret_key", (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid or expired token" });
            }

            const ownerId = decoded.id;  // Získání ID vlastníka z dekódovaného tokenu

            // Validace těla požadavku
            const { error, value } = validateCreateList(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            // Vytvoření nového seznamu s ownerId
            const newList = {
                name: value.name,
                ownerId: ownerId,  // Využití ownerId z tokenu
                items: [],
                users: [{ userId: ownerId, role: 'Owner' }]
            };

            lists.push(newList);  // Přidání seznamu do mockData
            res.status(201).json({ message: 'List created successfully', list: newList });
        });
    } catch (err) {
        // Chyby, které mohou nastat během procesu
        console.error(err);  // Debugging log
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export default createList;
