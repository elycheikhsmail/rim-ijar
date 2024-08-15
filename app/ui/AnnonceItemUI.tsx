import React from "react";
import Image from "next/image";
//import { Annonce } from "../types";
import { AnnonceUI } from "@/app/lib/db/types";

const fallbackImageUrl = "/images/placeholder.jpg";
function getValidImageUrl(url: string | undefined): string {
  return typeof url === "string" && url.trim() !== "" ? url : fallbackImageUrl;
}
export default function AnnonceItem(annonce: AnnonceUI) {
  return (
    <>
      <article className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="relative h-48 w-full">
          <Image
            src={getValidImageUrl(annonce.image_url)}
            alt={annonce.description}
            fill
            unoptimized
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="p-6 flex-grow">
          <h2 className="text-xl font-semibold mb-2">
            {annonce.description.slice(0, 5)}
          </h2>
          <p className="text-gray-600 mb-2">{annonce.description}</p>
          <p className="text-lg font-bold">{annonce.price}€ / jour</p>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
            {annonce.categorie}
          </span>
        </div>
      </article>
    </>
  );
}
