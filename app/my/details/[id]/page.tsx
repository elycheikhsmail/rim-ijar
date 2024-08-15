import React from "react";
import MyAnnonceDetailsUI from "@/app/ui/MyAnnonceDetailsUI";
import { db } from "@/app/lib/kysely";

export default async function AnnonceDetail(
  { params }: { params: { id: string } },
) {
  const annonceId = parseInt(params.id);
  //const annonce = annonces.find((a) => a.id === annonceId);
  const annonce = await db
    .selectFrom("annonces")
    .innerJoin("categories", "annonces.categorie_id", "categories.id")
    .select([
      "annonces.id as id",
      "categories.name as categorie",
      "annonces.description as description",
      "annonces.price as price",
      "annonces.image_url as image_url",
      "annonces.user_id as user_id",
      "annonces.lieu_str as lieu_str",
      "annonces.created_at as created_at",
    ])
    .where("annonces.id", "=", annonceId)
    .executeTakeFirst();

  if (!annonce) {
    return (
      <h1 className="text-3xl font-bold text-center mt-16 text-red-600">
        Annonce non trouvée
      </h1>
    );
  }

  return <MyAnnonceDetailsUI annonceId={annonceId} annonce={annonce} />;
}
