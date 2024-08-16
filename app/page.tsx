 import ListAnnoncesUI from "./ui/ListAnnoncesUI";

import { db } from "@/app/lib/kysely";

export default async function Home(
  {
    searchParams,
  }: {
    searchParams?: {
      page?: string;
    };
  },
) {
  const annonces = await db
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
    ]).execute();
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <main className="min-h-screen">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Annonces de biens à louer
        </h1>
          <ListAnnoncesUI currentPage={currentPage} annonces={annonces} />
      </div>
    </main>
  );
}
