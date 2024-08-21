import AnnonceDetailCompo from "@/app/ui/AnnonceDetailsUI";
import { db } from "@/app/lib/kysely";

export default async function AnnonceDetail(
  { params }: { params: { id: string } },
) {
  const annonceId = parseInt(params.id);
  console.log({annonceId})
  // must be owned by current user
  const annonce = await db
    .selectFrom("annonces")
    .innerJoin("categories", "annonces.categorie_id", "categories.id")
    .select([
      "annonces.id as id",
      "categories.name as categorie",
      "categorie_id",
      "sub_categorie_id",
      "annonces.description as description",
      "annonces.price as price",
      "annonces.image_url as image_url",
      "annonces.user_id as user_id",
      "annonces.lieu_str as lieu_str",
      "annonces.created_at as created_at",
      "annonces.options_object"
    ])
    .where("annonces.id", "=", annonceId)
    .executeTakeFirst();

    console.log("annonce ")
    console.log(annonce)
    console.log("annonce?.options_object")
    console.log(annonce?.options_object)

  if (!annonce) {
    return (
      <h1 className="text-2xl font-bold text-center mt-8">
        Annonce non trouvée
      </h1>
    );
  }

  return <AnnonceDetailCompo annonceId={annonceId} annonce={annonce} />;
}
