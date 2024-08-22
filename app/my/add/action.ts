"use server";
import { db } from "@/app/lib/kysely";
import { cookies } from "next/headers";
import annonceSchema from "./zSchema";
import { AnnonceType } from "@/app/lib/db";


export default async function addAnnonceAction(formData: FormData) {
  const sessionId = cookies().get("sessionId");
  let user_id = -1
  if (!sessionId) {
    return { error: "not auth user", issues: "not auth user" };
  }
  if (sessionId) {
    const session = await db.selectFrom("sessions").selectAll().where("sessions.token", "=", sessionId.value).executeTakeFirst()
    console.log({ session })
    if (!session) {
      return { error: "not auth user", issues: "not auth user" };
    }else{
      user_id = session.user_id
    }
  }



  const validatedFields = annonceSchema.safeParse({
    categorie_id: formData.get("categorie_id"),
    //user_id: formData.get("user_id"),
    description: formData.get("description"),
    lieu_str: formData.get("lieu_str"),
    image_url: formData.get("image_url"),
    price: formData.get("price"),
  });

  if (!validatedFields.success) {
    console.log("Validation échouée:", validatedFields.error.issues);
    return { error: "Validation failed", issues: validatedFields.error.issues };
  }


  const {
    categorie_id,
    description,
    lieu_str,
    image_url,
    price,
  } = validatedFields.data;
  console.log(
    categorie_id,
    description,
    lieu_str,
    image_url,
    price,
  );
  try {
    await db.insertInto("annonces").values(
      {
        categorie_id,
        type:AnnonceType.Location,
        sub_categorie_id:1,
        user_id,
        description,
        lieu_str,
        image_url,
        price,
        options_object: JSON.stringify([])
       
      },
    ).execute();

    return { success: true, message: "annonce ajouter avec succes" };
  } catch (error) {
    console.log(error);
    return {
      error: "l'ajout de l'annoce a echoue ",
      issues: "l'ajout de l'annoce a echoue ",
    };
  }
}
