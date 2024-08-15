//import { Annonce } from "../types";
import { AnnonceUI } from "@/app/lib/db/types";

export default function AnnonceDetailUI(
  props: { annonceId: number; annonce: AnnonceUI },
) {
  return (
    <main className="min-h-screen">
      <div className="p-8">
        <article className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4">
            {props.annonce.description.slice(0, 1)}
          </h1>
          <p className="text-gray-600 mb-4">{props.annonce.description}</p>
          <p className="text-2xl font-bold mb-4">
            {props.annonce.price}€ / jour
          </p>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {props.annonce.categorie}
          </span>
        </article>
      </div>
    </main>
  );
}
