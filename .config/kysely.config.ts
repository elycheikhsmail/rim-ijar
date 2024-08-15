import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { defineConfig } from "kysely-ctl";
//import "@/loadEnv"; // Assurez-vous de charger les variables d'environnement

import { z } from "zod";
import "../loadEnv"; // Assurez-vous de charger les variables d'environnement

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
// document and valiate env variable types
// document and valiate env variable types
const envSchema = z.object({
  DATABASE_URL: z.string(),
});
//
// 
export const env = envSchema.parse(process.env);
console.log(" ...........................................................")
console.log(" ")
console.log("connectionString ise :")
console.log(env.DATABASE_URL)
console.log(" ")
console.log(" ...........................................................")

const dialect = new PostgresDialect({
  pool: new Pool({
  
    connectionString: env.DATABASE_URL
    // host: PGHOST,
    // database: PGDATABASE,
    // username: PGUSER,
    // password: PGPASSWORD,
    // port: 5432,
    // ssl: 'require',
  }),
});

 
export const db = new Kysely({
  dialect,
});
export default defineConfig({
  // replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
  dialect: "pg",
  dialectConfig: {
    pool: new Pool({
      connectionString: env.DATABASE_URL
    }),
  },
  migrations: {
    migrationFolder: "app/lib/db/migrations",
  },
  plugins: [],
  seeds: {
    seedFolder: "app/lib/db/seed",
  },
});
