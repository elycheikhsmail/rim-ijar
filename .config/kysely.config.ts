import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { defineConfig } from "kysely-ctl"; 
import { z } from "zod";
 
const envSchema = z.object({
  DATABASE_URL: z.string(),
});
// 
const env = envSchema.parse(process.env); 
//
const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: env.DATABASE_URL
  }),
});
//
export const db = new Kysely({
  dialect,
});
//
export default defineConfig({
  dialect,
  migrations: {
    migrationFolder: "app/lib/db/migrations",
  },
  plugins: [],
  seeds: {
    seedFolder: "app/lib/db/seed",
  },
});

 