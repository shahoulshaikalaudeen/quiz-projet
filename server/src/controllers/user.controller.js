const { hashPassword, comparePassword, generateToken } = require('../services/user.service');
const { findUserByEmail, createUser } = require("../repositories/user.repository");
const { registerSchema, loginSchema } = require("../validation/authValidation");

const register = async (req, res) => {
  try {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) return res.status(400).json({ error: validation.error });

    const { username, email, password } = req.body;
    if (await findUserByEmail(email)) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({ username, email, password: hashedPassword });

    res.status(201).json({ message: "Utilisateur créé avec succès", userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const login = async (req, res) => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) return res.status(400).json({ error: validation.error });

    const { email, password } = req.body;


    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ error: "Email ou mot de passe invalide" });


    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) return res.status(400).json({ error: "Email ou mot de passe invalide" });


    const token = generateToken(user._id);


    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ message: "Connexion réussie" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Déconnexion réussie" });
};

module.exports = { register, login, logout };

