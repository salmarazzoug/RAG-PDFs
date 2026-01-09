
# RAG-PDFs – Assistant PDF Intelligent

## Description
**RAG-PDFs** est un assistant intelligent qui permet de poser des questions directement à partir de documents PDF.  
Le système utilise **RAG (Retrieval-Augmented Generation)** pour rechercher dans les documents et fournir des réponses contextuelles précises, en s’assurant que le modèle **ne répond qu’en fonction du contenu fourni**.

---

## Fonctionnalités principales
* **Indexation PDF** : découpage en sections (chunking), création d’embeddings, stockage dans une base vectorielle (Pinecone)  
* **Chatbot intelligent** : pose des questions et obtient des réponses basées sur le contenu indexé  
* **API REST simple** : endpoints Express pour uploader des fichiers et poser des questions  
* **Interface utilisateur basique** : HTML/CSS pour uploader un PDF et poser des questions  
* **Réponses fiables** : le chatbot répond uniquement à partir du contexte disponible, aucune hallucination  

---

## Structure du projet
```text
public/
    index.html           # Interface HTML pour uploader et poser des questions
.gitignore
IndexRAG.js             # Logique d’indexation et préparation RAG
RAG_chatbot.js          # Logique du chatbot / génération des réponses
README.md               # Ce fichier README
package.json            # Dépendances et scripts npm
prepareRAG.js           # Préparation des documents et embeddings
server.js               # Serveur Express pour API
````

---

## API Endpoints

| Endpoint         | Méthode | Description                               |
| ---------------- | ------- | ----------------------------------------- |
| `/upload`        | POST    | Upload d’un PDF pour indexation           |
| `/chat`          | POST    | Poser une question et obtenir une réponse |
| `/documents`     | GET     | Liste des documents indexés (optionnel)   |
| `/delete/:docId` | DELETE  | Supprimer un document indexé (optionnel)  |

### Exemple d’utilisation avec cURL

**Upload d’un fichier PDF**

```bash
curl -X POST http://localhost:5000/upload \
-F "file=@mon_document.pdf"
```

**Poser une question**

```bash
curl -X POST http://localhost:5000/chat \
-H "Content-Type: application/json" \
-d '{"question": "Quels sont les ingrédients principaux du produit?"}'
```

---

## Exemple de code

### Indexation du document

```javascript
import { indexDocument } from "./prepareRAG.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const sampleFile = "./sample.pdf";
await indexDocument(sampleFile);
```

### Chatbot / génération de réponse

```javascript
import { generate } from "./RAG_chatbot.js";

const answer = await generate("Quels sont les ingrédients principaux du produit?");
console.log(answer);
```

### Serveur Express (server.js)

```javascript
import express from "express";
import multer from "multer";
import { generate } from "./RAG_chatbot.js";
import { indexTheDocument } from "./prepareRAG.js";

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
    await indexTheDocument(req.file.path);
    res.json({ message: "PDF indexé avec succès !" });
});

app.post("/chat", async (req, res) => {
    const { question } = req.body;
    const result = await generate(question);
    res.json({ message: result });
});

app.listen(5000, () => console.log("Server running on PORT 5000"));
```

---

## Interface utilisateur (HTML)

```html
<input type="file" id="pdfFile" />
<button onclick="uploadPDF()">Upload PDF</button>

<input type="text" id="question" placeholder="Pose ta question" />
<button onclick="askQuestion()">Envoyer</button>

<div id="response"></div>

<script>
async function uploadPDF() { /* Envoie PDF à /upload */ }
async function askQuestion() { /* Envoie question à /chat */ }
</script>
```

---

## Installation et utilisation

* Cloner le repo :

```bash
git clone https://github.com/salmarazzoug/RAG-PDFs.git
cd RAG-PDFs
```

* Installer les dépendances :

```bash
npm install
```

* Créer un fichier `.env` avec vos clés API :

```
GROQ_API_KEY=...
GEMINI_API_KEY=...
PINECONE_INDEX_NAME=...
```

* Lancer le serveur :

```bash
npm start
```

* Ouvrir `public/index.html` pour uploader un PDF et poser des questions via l’interface ou utiliser les endpoints API.

---

## Exemple concret

* Upload d’un PDF sur un produit cosmétique
* Question : “Quels sont les ingrédients utilisés ?”
* Réponse générée : “Aqua, Glycerin, Niacinamide…”

---

## Points forts

* Démonstration complète d’un pipeline **RAG/LLM**
* API REST fonctionnelle + interface utilisateur simple
* Respect strict du contexte des documents pour des réponses fiables
* Utilisation de Pinecone pour les embeddings et indexation vectorielle
* Projet clair et prêt à l’emploi pour un stage ML Engineer

---

## Lien GitHub

[https://github.com/salmarazzoug/RAG-PDFs](https://github.com/salmarazzoug/RAG-PDFs)

```
