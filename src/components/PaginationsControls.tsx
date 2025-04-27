"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Button } from "./ui/button";

type PaginationControlsProps = {
  totalItems: number;
  itemsPerPage: number;
  defaultPage?: number;
};

export const PaginationsControls: React.FC<PaginationControlsProps> = ({
  totalItems,
  itemsPerPage,
  defaultPage = 1,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParams = searchParams.get("page");
  const currentPage = pageParams ? Number(pageParams) : defaultPage;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const updatedParams = new URLSearchParams(searchParams.toString());
      updatedParams.set("page", newPage.toString());

      router.push(`?${updatedParams.toString()}`);
    }
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        pages.push(pageNumber);
      }
    } else {
      if (currentPage <= 3) {
        for (let pageNumber = 1; pageNumber <= 4; pageNumber++) {
          pages.push(pageNumber);
        }

        pages.push(-1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1);

        for (
          let pageNumber = totalPages - 3;
          pageNumber <= totalPages;
          pageNumber++
        ) {
          pages.push(pageNumber);
        }
      } else {
        pages.push(1);
        pages.push(-1);

        for (
          let pageNumber = currentPage - 1;
          pageNumber <= currentPage + 1;
          pageNumber++
        ) {
          pages.push(pageNumber);
        }
        pages.push(-1);
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex w-full items-center justify-center space-x-2">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <p className="flex items-center gap-1">
          <ArrowLeft /> Précédent
        </p>
      </Button>
      <div className="space-x-4">
        {getPageNumbers().map((pageNumber, idx) =>
          pageNumber === -1 ? (
            <span key={`ellipsis-${idx}`} className="px-3 py-1">
              ...
            </span>
          ) : (
            <Button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={
                currentPage === pageNumber ? "bg-primary text-white" : ""
              }
              disabled={currentPage === pageNumber}
              variant={currentPage === pageNumber ? "default" : "outline"}
            >
              {pageNumber}
            </Button>
          )
        )}
      </div>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <p className="flex items-center gap-1">
          Suivant <ArrowRight />
        </p>
      </Button>
    </div>
  );
};
