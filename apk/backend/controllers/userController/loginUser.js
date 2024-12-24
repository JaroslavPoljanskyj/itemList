import jwt from "jsonwebtoken";
import users from "../../mockData/users.js";

const loginUser = (req, res) => {
    const {username, password} = req.body;

    // Najdeme uživatele podle username
    const user = users.find((u) => u.username === username);
    if (!user) return res.status(404).json({error: "User not found"});

    // Ověření hesla (pro jednoduchost bez bcrypt)
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) return res.status(401).json({error: "Invalid credentials"});

    // Vytvoříme JWT token
    const token = jwt.sign(
        {id: user.id},
        "secret_key",
        {expiresIn: "1h"}
    );

    // Nastavíme token do cookies
    res.cookie("jwt", token, {
        httpOnly: true, // Zabezpečí token, aby nebyl dostupný přes JavaScript (XSS ochrana)
        secure: true, // Pouze HTTPS v produkci
        maxAge: 3600000, // Expirace cookies (1 hodina)
        sameSite: "none", // Ochrana proti CSRF
    });

    // Pošleme úspěšnou odpověď
    res.status(200).json({
        message: "Login successful",
        token: token,
        userId: user.id
    });
}
export default loginUser;
