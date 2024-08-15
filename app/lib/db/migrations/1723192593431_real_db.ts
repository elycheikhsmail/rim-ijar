import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // up migration code goes here...
  // note: up migrations are mandatory. you must implement this function.
  // For more info, see: https://kysely.dev/docs/migrations
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .addColumn("password", "varchar", (col) => col.notNull())
    .addColumn(
      "created_at",
      "timestamp",
      (col) => col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createTable("sessions")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "serial")
    .addColumn("token", "varchar", (col) => col.notNull())
    .addColumn("is_exp", "boolean")
    .addColumn(
      "created_at",
      "timestamp",
      (col) => col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createTable("categories")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull().unique())
    .addColumn(
      "created_at",
      "timestamp",
      (col) => col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createTable("annonces")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("categorie_id", "serial", (col) => col.notNull())
    .addColumn("user_id", "serial", (col) => col.notNull())
    //
    .addColumn("description", "varchar", (col) => col.notNull())
    .addColumn("lieu_str", "varchar", (col) => col.notNull())
    .addColumn("image_url", "varchar", (col) => col.notNull())
    .addColumn("price", "integer", (col) => col.notNull())
    .addColumn(
      "created_at",
      "timestamp",
      (col) => col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("users").execute();
  await db.schema.dropTable("sessions").execute();
  await db.schema.dropTable("categories").execute();
  await db.schema.dropTable("annonces").execute();
}
