import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const TEST_USER = process.env.TEST_USER;
const TEST_PASS = process.env.TEST_PASS;

export const login = (req, res) => {
    const { username, password } = req.body || {};

    if (username === TEST_USER && password === TEST_PASS) {
        const payload = { username };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
        return res.json({ token });
    }

    return res.status(401).json({ error: "Credenciais inválidas" });
};
