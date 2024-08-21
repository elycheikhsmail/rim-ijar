import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("users").ifExists().execute();
	await db.schema
		.createTable("users")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("email", "varchar", (col) => col.notNull().unique())
		.addColumn("password", "varchar(60)", (col) => col.notNull())  // Hachage
		.addColumn(
			"created_at",
			"timestamp",
			(col) => col.defaultTo(sql`now()`).notNull(),
		)
		.execute();

	await db.schema
		.createTable("sessions")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("user_id", "integer", (col) => col.notNull())
		.addColumn("token", "varchar(255)", (col) => col.notNull())
		.addColumn("is_exp", "boolean", (col) => col.defaultTo(false).notNull())
		.addColumn(
			"created_at",
			"timestamp",
			(col) => col.defaultTo(sql`now()`).notNull(),
		)
		.addForeignKeyConstraint("fk_user_id", ["user_id"], "users", ["id"])
		.execute();

	await db.schema // categorie (principale) immobilier / auto/...
		.createTable("categories")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("name", "varchar", (col) => col.notNull() )
		.addColumn("is_vente", "boolean", (col) => col.notNull().defaultTo(false))
		.addColumn("is_location", "boolean", (col) => col.notNull().defaultTo(false))
		.addColumn("is_service", "boolean", (col) => col.notNull().defaultTo(false))
		.addColumn(
			"created_at",
			"timestamp",
			(col) => col.defaultTo(sql`now()`).notNull(),
		)
		.execute();

		await db.schema // vente/immobilier/ villa /appartement
		.createTable("sub_categories")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("name", "varchar", (col) => col.notNull() )
		.addColumn("categorie_id", "integer", (col) => col.notNull())
		.addColumn(
			"created_at",
			"timestamp",
			(col) => col.defaultTo(sql`now()`).notNull(),
		)
		.execute();

	await db.schema
		.createTable("annonces")
		.addColumn("id", "serial", (col) => col.primaryKey()) 
		// categorie (principale)=type(vente/location/service) immobilier / auto/...
		.addColumn("categorie_id", "integer", (col) => col.notNull()) 
		//
		.addColumn("sub_categorie_id", "integer", (col) => col.notNull()) 
		.addColumn("options_object", "json")
		//options par exemple surface,..nombre_chambre
		.addColumn("user_id", "integer", (col) => col.notNull())
		//
		.addColumn("description", "varchar", (col) => col.notNull())
		.addColumn("price", "integer", (col) => col.notNull())
		//
		.addColumn("lieu_str", "varchar", (col) => col.notNull())
		.addColumn("lieu_object", "json",)
		//
		.addColumn("image_url", "varchar", (col) => col.notNull())
		.addColumn("image_object", "varchar")
		//
		.addColumn(
			"created_at",
			"timestamp",
			(col) => col.defaultTo(sql`now()`).notNull(),
		)
		.addForeignKeyConstraint("fk_categorie_id", ["categorie_id"], "categories", ["id"])
		.addForeignKeyConstraint("fk_user_id", ["user_id"], "users", ["id"])
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> { 
	await db.schema.dropTable("annonces").execute();
	await db.schema.dropTable("sessions").execute();
	await db.schema.dropTable("sub_categories").execute();
	await db.schema.dropTable("categories").execute();
	await db.schema.dropTable("users").execute();

	

}



