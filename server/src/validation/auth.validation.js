const { z } = require("zod");

const registerSchema = z.object({
  username: z.string().min(3, "Le nom d'utilisateur doit avoir au moins 3 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit avoir au moins 6 caractères"),
});

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe invalide"),
});

module.exports = { registerSchema, loginSchema };
