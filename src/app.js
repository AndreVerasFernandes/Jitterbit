import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/", orderRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});