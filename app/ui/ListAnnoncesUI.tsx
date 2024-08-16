import Link from "next/link"; 
import { AnnonceUI } from "@/app/lib/db/types";

import AnnonceItemUI from "@/app/ui/AnnonceItemUI";
import PaginationUI from "@/app/ui/PaginationUI";

export default function ListAnnoncesUI(
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
        <PaginationUI totalPages={totalPages} currentPage={currentPage} />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedAnnonces.map((annonce) => (
            <Link
              href={`/p/annoces/details/${annonce.id}`}
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
