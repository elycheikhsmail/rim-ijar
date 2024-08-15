import { DatabaseInterfaces } from "./db/index"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { z } from "zod";
//import "@/loadEnv"; // Assurez-vous de charger les variables d'environnement

// document and valiate env variable types
const envSchema = z.object({
  DATABASE_URL: z.string(),
});
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
  }),
});

export const db = new Kysely<DatabaseInterfaces>({
  dialect,
});
