import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, numberOfPages, onPageChange }) {
  if (!numberOfPages || numberOfPages <= 1) {
    return null;
  }

  const getPages = () => {
    const pages = [];

    if (numberOfPages <= 5) {
      for (let page = 1; page <= numberOfPages; page++) {
        pages.push(page);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(numberOfPages - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (currentPage < numberOfPages - 2) {
      pages.push("...");
    }

    pages.push(numberOfPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div
      className="mt-12 flex items-center justify-center gap-2"
      dir="rtl"
    >
      {/* السابق */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          flex h-10 items-center gap-1
          rounded-xl
          border border-gray-200
          bg-white
          px-4
          text-sm font-medium text-gray-600
          transition-all duration-200
          hover:border-gray-300
          hover:bg-gray-50
          hover:text-gray-900
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        السابق
        <ChevronRight size={17} />
      </button>

      {/* أرقام الصفحات */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="px-1 text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              flex h-10 w-10 items-center justify-center
              rounded-xl
              text-sm font-semibold
              ${
                currentPage === page
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >
            {page}
          </button>
        ),
      )}

      {/* التالي */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === numberOfPages}
        className="
          flex h-10 items-center gap-1
          rounded-xl
          border border-gray-200
          bg-white
          px-4
          text-sm font-medium text-gray-600
          transition-all duration-200
          hover:border-gray-300
          hover:bg-gray-50
          hover:text-gray-900
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <ChevronLeft size={17} />
        التالي
      </button>
    </div>
  );
}

export default Pagination;