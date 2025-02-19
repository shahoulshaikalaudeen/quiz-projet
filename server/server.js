require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur de connexion MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
