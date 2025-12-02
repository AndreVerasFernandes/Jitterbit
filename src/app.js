import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

// Rotas públicas de autenticação
app.use("/auth", authRoutes);

// Rotas de pedidos (protegidas pelo middleware em `orderRoutes`)
app.use("/", orderRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});