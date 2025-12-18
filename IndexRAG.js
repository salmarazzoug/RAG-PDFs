/**
 * Plan de mise en œuvre :
 *
 * Étape 1 : Indexation du document
 * 1. Charger le fichier (PDF, TXT…)
 * 2. Découper le texte en sections
 * 3. Créer des embeddings pour chaque section
 * 4. Stocker dans une base vectorielle (Pinecone, Weaviate…)
 *
 * Étape 2 : Chatbot
 * 1. Initialiser le modèle de langage
 * 2. Récupérer les informations pertinentes
 * 3. Fournir le contexte + question au modèle
 * 4. Obtenir la réponse
 */

import { indexDocument } from "./prepareRAG.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const sampleFile = "./sample.pdf";
await indexDocument(sampleFile);
