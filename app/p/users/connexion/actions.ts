"use server";
import "server-only";
import { db } from "@/app/lib/kysely";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
// data validation
const ConnexionSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(
    6,
    "Le mot de passe doit contenir au moins 6 caractères",
  ),
});
//
export async function connexionAction(formData: FormData) {
  console.log("Action serveur appelée");
  console.log(formData.get("email"));

  const validatedFields = ConnexionSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.log("Validation échouée:", validatedFields.error.issues);
    return { error: "Validation failed", issues: validatedFields.error.issues };
  }

  const { email, password } = validatedFields.data;

  console.log("Tentative de connexion avec:", email);
  const user = await db.selectFrom("users").selectAll().where(
    "users.email",
    "=",
    email,
  ).executeTakeFirst();
  if (!user) {
    return {
      error: "email invalide",
      issues: "email  is invalide",
    };
  } else {
    // verifier le mot de passe
    if (user.password != password) {
      return {
        error: "password is invalide",
        issues: "password is invalide",
      };
    }


    // set cookies in headers
    // redierct
    const sessionId = uuidv4();
    // save seesion in db
    await db.insertInto("sessions").values({
      "user_id":user.id,
      "is_exp":false,
      "token":sessionId
  
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

  return { success: true, message: "Connexion réussie" };
}
