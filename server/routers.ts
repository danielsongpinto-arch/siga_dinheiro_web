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

const articleSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  category: z.string(),
  themeId: z.string(),
  readTime: z.string(),
  date: z.date().optional(),
});

export const appRouter = router({
  articles: router({
    getAll: publicProcedure.query(async () => {
      return getAllArticles();
    }),

    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }: any) => {
        return getArticleById(input.id);
      }),

    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }: any) => {
        return getArticlesByCategory(input.category);
      }),

    create: publicProcedure
      .input(articleSchema)
      .mutation(async ({ input }: any) => {
        return createArticle(input);
      }),

    update: publicProcedure
      .input(
        z.object({
          id: z.string(),
          data: articleSchema.partial(),
        })
      )
      .mutation(async ({ input }: any) => {
        return updateArticle(input.id, input.data);
      }),

    delete: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }: any) => {
        await deleteArticle(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
