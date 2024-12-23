import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Přečte token z hlavičky

    if (!token) return res.status(401).json({ error: "No token provided" });

    // Ověření a dekódování tokenu
    jwt.verify(token, "secret_key", (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid or expired token" });

        req.user = user;  // Přidání uživatelských informací do požadavku
        next();  // Pokračování na další middleware nebo endpoint
    });
};
export const checkUser = (req, res, next) => {
    const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1]; // Token z cookies nebo hlavičky

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET || "secret_key", async (err, decodedToken) => {
            if (err) {
                console.error(err.messages);
                res.locals.user = null;
                next();
            } else {
                const user = { id: decodedToken.id };
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
    };