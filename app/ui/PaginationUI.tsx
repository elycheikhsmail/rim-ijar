"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaginationUI(props: {
  totalPages: number;
  currentPage: number;
}) {
  const router = useRouter();

  const handleClickToNextPage = () => {
    //const currentPage = Number(router.query.page) || 1;
    const nextPage = props.currentPage + 1;
    router.push(`?page=${nextPage}`);
  };

  const handleClickPrevPage = () => {
    //const currentPage = Number(router.query.page) || 1;
    const nextPage = props.currentPage - 1;
    router.push(`?page=${nextPage}`);
  };

  return (
    <>
      <div className="mt-8 flex justify-center">
        <button
          // onClick={() => props.setCurrentPage(prev => Math.max(prev - 1, 1))}

          onClick={() => handleClickPrevPage()}
          disabled={props.currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="py-2 px-4">
          Page {props.currentPage} sur {props.totalPages}
        </span>
        <button
          // onClick={() => props.setCurrentPage(prev => Math.min(prev + 1, props.totalPages))}
          onClick={() => handleClickToNextPage()}
          disabled={props.currentPage === props.totalPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </>
  );
}
