import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { eq, desc } from "drizzle-orm";
import * as schema from "../drizzle/schema";

let db: any = null;

export async function getDb() {
  if (!db) {
    const connection = await mysql.createConnection(
      process.env.DATABASE_URL || ""
    );
    db = drizzle(connection, { schema, mode: "default" });
  }
  return db;
}

export async function getAllArticles() {
  const database = await getDb();
  return database.query.articles.findMany({
    orderBy: [desc(schema.articles.date)],
  });
}

export async function getArticleById(id: string) {
  const database = await getDb();
  return database.query.articles.findFirst({
    where: eq(schema.articles.id, id),
  });
}

export async function createArticle(data: schema.NewArticle) {
  const database = await getDb();
  await database.insert(schema.articles).values(data);
  return getArticleById(data.id);
}

export async function updateArticle(
  id: string,
  data: Partial<schema.NewArticle>
) {
  const database = await getDb();
  await database
    .update(schema.articles)
    .set(data)
    .where(eq(schema.articles.id, id));
  return getArticleById(id);
}

export async function deleteArticle(id: string) {
  const database = await getDb();
  await database
    .delete(schema.articles)
    .where(eq(schema.articles.id, id));
}

export async function getArticlesByCategory(category: string) {
  const database = await getDb();
  return database.query.articles.findMany({
    where: eq(schema.articles.category, category),
    orderBy: [desc(schema.articles.date)],
  });
}
