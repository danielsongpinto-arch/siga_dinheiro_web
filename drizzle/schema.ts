import { mysqlTable, varchar, text, timestamp, int, index } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const articles = mysqlTable(
  "articles",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    summary: text("summary").notNull(),
    content: text("content").notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    themeId: varchar("theme_id", { length: 100 }).notNull(),
    readTime: varchar("read_time", { length: 50 }).notNull(),
    date: timestamp("date").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow().defaultNow().notNull(),
  },
  (table) => ({
    categoryIdx: index("category_idx").on(table.category),
    themeIdx: index("theme_idx").on(table.themeId),
    dateIdx: index("date_idx").on(table.date),
  })
);

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
