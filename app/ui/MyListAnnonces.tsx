import Link from "next/link";
//import { Annonce } from "../types";
import AnnonceItemUI from "./AnnonceItemUI";
import PaginationUI from "./PaginationUI";
import { AnnonceUI } from "@/app/lib/db";

export default function MyListAnnoncesUI(
  { currentPage, annonces }: { currentPage: number; annonces: AnnonceUI[] },
) {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(annonces.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAnnonces: AnnonceUI[] = annonces.slice(startIndex, endIndex);
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedAnnonces.map((annonce) => (
            <Link
              href={`/my/details/${annonce.id}`}
              key={annonce.id}
              className="block"
            >
              <AnnonceItemUI {...annonce} />
            </Link>
          ))}
        </div>
        <PaginationUI totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
}
