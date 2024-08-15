import { AnnonceUI } from "@/app/lib/db";
import React from "react";
//import { Annonce } from "@/app/types";

export default function MyAnnonceDetailsCompo(
  props: { annonceId: number; annonce: AnnonceUI },
) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-800 animate-fade-in-down">
        Bienvenue, Sidi !
      </h1>
      <p className="text-center mb-8 text-gray-600 italic">
        Les données ne sont pas encore stockées dans la base de données mocked.
      </p>

      <article className="bg-white shadow-2xl rounded-lg p-8 max-w-2xl mx-auto mt-8 transform hover:scale-105 transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Mon annonce</h2>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {props.annonce.description.split(" ").length > 0
            ? props.annonce.description.split(" ")[1]
            : ""}
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {props.annonce.description}
        </p>
        <p className="text-3xl font-bold mb-6 text-green-600">
          {props.annonce.price}€{" "}
          <span className="text-sm text-gray-500">/ jour</span>
        </p>
        <span className="inline-block bg-blue-200 rounded-full px-4 py-2 text-sm font-semibold text-blue-700 shadow-md hover:bg-blue-300 transition-colors duration-200">
          {props.annonce.categorie}
        </span>
      </article>
    </main>
  );
}
