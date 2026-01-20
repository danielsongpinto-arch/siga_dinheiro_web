import { router, publicProcedure } from "./trpc";
import { z } from "zod";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByCategory,
} from "./db";
import { NewArticle } from "../drizzle/schema";

export const appRouter = router({
  articles: router({
    // Listar todos os artigos
    getAll: publicProcedure.query(async () => {
      try {
        return await getAllArticles();
      } catch (error) {
        console.error("Erro ao listar artigos:", error);
        return [];
      }
    }),

    // Obter artigo por ID
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        try {
          return await getArticleById(input.id);
        } catch (error) {
          console.error("Erro ao obter artigo:", error);
          return null;
        }
      }),

    // Obter artigos por categoria
    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        try {
          return await getArticlesByCategory(input.category);
        } catch (error) {
          console.error("Erro ao obter artigos por categoria:", error);
          return [];
        }
      }),

    // Criar novo artigo
    create: publicProcedure
      .input(
        z.object({
          title: z.string().min(1, "Título é obrigatório"),
          summary: z.string().min(1, "Resumo é obrigatório"),
          content: z.string().min(1, "Conteúdo é obrigatório"),
          category: z.string().default("Arquitetos do Poder"),
          themeId: z.string().default("arquitetos-do-poder"),
          readTime: z.string().default("20 min"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const id = `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const newArticle: NewArticle = {
            id,
            title: input.title,
            summary: input.summary,
            content: input.content,
            category: input.category,
            themeId: input.themeId,
            readTime: input.readTime,
          };
          await createArticle(newArticle);
          return { success: true };
        } catch (error) {
          console.error("Erro ao criar artigo:", error);
          throw error;
        }
      }),

    // Atualizar artigo
    update: publicProcedure
      .input(
        z.object({
          id: z.string(),
          title: z.string().min(1),
          summary: z.string().min(1),
          content: z.string().min(1),
          category: z.string(),
          themeId: z.string(),
          readTime: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const updates = {
            title: input.title,
            summary: input.summary,
            content: input.content,
            category: input.category,
            themeId: input.themeId,
            readTime: input.readTime,
          };
          await updateArticle(input.id, updates);
          return { success: true };
        } catch (error) {
          console.error("Erro ao atualizar artigo:", error);
          throw error;
        }
      }),

    // Deletar artigo
    delete: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        try {
          await deleteArticle(input.id);
          return { success: true };
        } catch (error) {
          console.error("Erro ao deletar artigo:", error);
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
