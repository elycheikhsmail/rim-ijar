import MyListAnnoncesUI from "@/app/ui/MyListAnnonces";
import { Suspense } from "react";
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
  // msut select only annoces for current user
  const currentPage = Number(searchParams?.page) || 1;
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

  return (
    <main className="min-h-screen">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Bienvenue, Sidi !
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Mes Annonces
        </h2>
        <p className="text-center mb-8 text-gray-600">
          Les données ne sont pas encore stockées dans la base de données
          mocked.
        </p>
        <Suspense>
          <MyListAnnoncesUI currentPage={currentPage} annonces={annonces} />
        </Suspense>
      </div>
    </main>
  );
}

// "use client";
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const fallbackImageUrl = '/images/placeholder.jpg';

// function getValidImageUrl(url: string | undefined): string {
//   return typeof url === 'string' && url.trim() !== '' ? url : fallbackImageUrl;
// }
// import React from 'react';
// import AnnonceItem from '@/app/ui/AnnonceItemUI';
// import PaginationCompo from '@/app/ui/PaginationUI';
// import { annonces } from '@/data/annonces';
// import { Annonce } from '@/app/types';

// function MyListCompo(props:{paginatedAnnonces:Annonce[]}) {

// }

// export default function MyList() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [paginatedAnnonces, setPaginatedAnnonces] = useState<typeof annonces>([]);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     setPaginatedAnnonces(annonces.slice(startIndex, endIndex));
//   }, [currentPage]);

//   const totalPages = Math.ceil(annonces.length / itemsPerPage);

//   return (
//     <main className="min-h-screen">
//       <div className="p-8">
//         <h1 className="text-3xl font-bold mb-4 text-center">Bienvenue, Sidi !</h1>
//         <h2 className="text-2xl font-semibold mb-4 text-center">Mes Annonces</h2>
//         <p className="text-center mb-8 text-gray-600">Les données ne sont pas encore stockées dans la base de données mocked.</p>
//         <div className="container mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {paginatedAnnonces.map((annonce) => (
//               <Link href={`/my/details/${annonce.id}`} key={annonce.id} className="block">
//                 <AnnonceItem {...annonce} />
//               </Link>
//             ))}
//           </div>
//           {/* <PaginationCompo totalPages={totalPages} currentPage={currentPage} setCurrentPage={(v) => setCurrentPage(v)}></PaginationCompo> */}
//         </div>
//       </div>
//     </main>
//   );
// }
