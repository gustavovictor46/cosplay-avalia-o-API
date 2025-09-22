import express from "express";
import dotenv from "dotenv";
import cosplayRoutes from "./src/routes/cosplayRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ message: "🧝 API do Sistema de Cosplays funcionando"});
});

app.use("/cosplays", cosplayRoutes);

app.listen(serverPort, () => {
    console.log(`🧝 Servidor rodando em http://localhost:${serverPort} 🧝`);
});''