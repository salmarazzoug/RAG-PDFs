import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { generate } from "./chatbot.js";
import { indexTheDocument } from "./prepare.js";

dotenv.config({ path: "./.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // sert le dossier public

const PORT = process.env.PORT || 5000;

// Upload configuration
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const filePath = req.file.path;
        await indexTheDocument(filePath);
        res.json({ message: "PDF indexé avec succès !" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de l’indexation du PDF." });
    }
});

app.post("/chat", async (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: "Missing question" });

    try {
        const result = await generate(question);
        res.status(200).json({ message: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la génération de réponse." });
    }
});

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
