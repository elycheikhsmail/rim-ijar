import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {

	// Créer le type ENUM
	await sql`CREATE TYPE annonce_type AS ENUM ('vente', 'location', 'service', 'autre')`.execute(db)
  // Création de la table commun_annonces
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
		//.addForeignKeyConstraint("fk_user_id", ["user_id"], "users", ["id"])
		.execute();
    /*
    pour la compatibilite, pour ne pas cassser les types typescript et requet sql
    */
  

	await db.schema // categorie (principale) immobilier / auto/...
		.createTable("categories")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("name", "varchar", (col) => col.notNull() )
		//
		.addColumn('type', sql`annonce_type`, (col) => col.notNull()) 
		//

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

		//
		.addColumn('type', sql`annonce_type`, (col) => col.notNull()) 
		//
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
		//.addForeignKeyConstraint("fk_categorie_id", ["categorie_id"], "categories", ["id"])
		//.addForeignKeyConstraint("fk_user_id", ["user_id"], "users", ["id"])
		.execute();

   /*
    fin pour la compatibilite
    */
  
  //
  await db.schema
    .createTable('commun_annonces')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('annonce_type', 'varchar', (col) => col.notNull())
    .addColumn('categorie_name', 'varchar', (col) => col.notNull())
    .addColumn('subCategorie_name', 'varchar', (col) => col.notNull())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('price', 'decimal(10, 2)', (col) => col.notNull())


    .addColumn('lieu_name', 'varchar', (col) => col.notNull())
    .addColumn('parent_id', 'integer', (col) => col.notNull())

    .addColumn('date_ajout', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute()


  // Création des tables pour la location
  await db.schema
    .createTable('location_categorie')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .execute()

  await db.schema
    .createTable('location_sub_categorie')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('location_categorie_id', 'integer', (col) => 
      col.references('location_categorie.id').onDelete('cascade'))
    .execute()

  await db.schema
    .createTable('location_annonces')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('categorie_id', 'integer', (col) => col.notNull())
    .addColumn('categorie_name', 'varchar', (col) => col.notNull())
    .addColumn('sub_categorie_id', 'integer', (col) => col.notNull())
    .addColumn('sub_categorie_name', 'varchar', (col) => col.notNull())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('price', 'decimal(10, 2)', (col) => col.notNull())
    .addColumn('date_ajout', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('lieu_name', 'varchar', (col) => col.notNull())
    .execute()

  // Création des tables pour la vente
  await db.schema
    .createTable('vente_categorie')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .execute()

  await db.schema
    .createTable('vente_sub_categorie')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('vente_categorie_id', 'integer', (col) => 
      col.references('vente_categorie.id').onDelete('cascade'))
    .execute()

  await db.schema
    .createTable('vente_annonces')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('categorie_id', 'integer', (col) => col.notNull())
    .addColumn('categorie_name', 'varchar', (col) => col.notNull())
    .addColumn('sub_categorie_id', 'integer', (col) => col.notNull())
    .addColumn('sub_categorie_name', 'varchar', (col) => col.notNull())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('price', 'decimal(10, 2)', (col) => col.notNull())
    .addColumn('date_ajout', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('lieu_name', 'varchar', (col) => col.notNull())
    .execute()

  // Création des tables pour le service
  await db.schema
    .createTable('service_categorie')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .execute()

  await db.schema
    .createTable('service_sub_categorie')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('service_categorie_id', 'integer', (col) => 
      col.references('service_categorie.id').onDelete('cascade'))
    .execute()

  await db.schema
    .createTable('service_annonces')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('categorie_id', 'integer', (col) => col.notNull())
    .addColumn('categorie_name', 'varchar', (col) => col.notNull())
    .addColumn('sub_categorie_id', 'integer', (col) => col.notNull())
    .addColumn('sub_categorie_name', 'varchar', (col) => col.notNull())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('price', 'decimal(10, 2)', (col) => col.notNull())
    .addColumn('date_ajout', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('lieu_name', 'varchar', (col) => col.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('service_annonces').execute()
  await db.schema.dropTable('service_sub_categorie').execute()
  await db.schema.dropTable('service_categorie').execute()
  await db.schema.dropTable('vente_annonces').execute()
  await db.schema.dropTable('vente_sub_categorie').execute()
  await db.schema.dropTable('vente_categorie').execute()
  await db.schema.dropTable('location_annonces').execute()
  await db.schema.dropTable('location_sub_categorie').execute()
  await db.schema.dropTable('location_categorie').execute()
  await db.schema.dropTable('commun_annonces').execute()
}