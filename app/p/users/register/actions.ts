"use server";
import { db } from "@/app/lib/kysely";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
const ConnexionSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(
    6,
    "Le mot de passe doit contenir au moins 6 caractères",
  ),
});
//
export async function registerAction(formData: FormData) {
  console.log("register Action serveur appelée");
  const validatedFields = ConnexionSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.log("Validation échouée:", validatedFields.error.issues);
    return { error: "Validation failed", issues: validatedFields.error.issues };
  }

  const { email, password } = validatedFields.data;
  console.log("Tentative d'inscrire avec:", email, password);

  // in production hash passeword
  // creer une session id pour l'utilisateur (si son inscription est reussi)
  //
  try {
    await db.insertInto("users").values(
      {
        "email": email,
        "password": password,
      },
    ).execute();

    const user = await db.selectFrom("users").selectAll().where(
      "users.email",
      "=",
      email,
    ).executeTakeFirst();

    const sessionId = uuidv4();
    // save seesion in db
    if (user) {
      await db.insertInto("sessions").values({
        "user_id": user.id,
        "is_exp": false,
        "token": sessionId

      }).execute()

      // Stockage du sessionId dans un cookie
      cookies().set("sessionId", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 semaine
        path: "/",
      });

    }

    return { success: true, message: "inscription réussie" };
  } catch (error) {
    console.log(error);
    return {
      error: "Validation failed/user already exist",
      issues: "user already exist",
    };
  }
}
