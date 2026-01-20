import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "./db";
import { NewArticle } from "../drizzle/schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());

  // ===== API Routes FIRST (before static files) =====
  
  app.get("/api/articles", async (_req, res) => {
    try {
      const articles = await getAllArticles();
      res.json(articles);
    } catch (error: any) {
      console.error("Erro ao listar artigos:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/articles", async (req, res) => {
    try {
      const { title, summary, content, category, themeId, readTime } = req.body;
      const id = `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const newArticle: NewArticle = {
        id,
        title,
        summary,
        content,
        category,
        themeId,
        readTime,
      };

      await createArticle(newArticle);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Erro ao criar artigo:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/articles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, summary, content, category, themeId, readTime } = req.body;

      await updateArticle(id, {
        title,
        summary,
        content,
        category,
        themeId,
        readTime,
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error("Erro ao atualizar artigo:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/articles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await deleteArticle(id);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Erro ao deletar artigo:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // ===== Static files and client-side routing AFTER API =====

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
