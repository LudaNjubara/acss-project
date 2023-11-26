import { ChangeEvent } from "react";

type TTablePaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

export default function TablePagination({ currentPage, setCurrentPage, totalPages }: TTablePaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handlePageChange(Number(event.target.value));
  };

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className="px-4 py-2 bg-neutral-900 text-neutral-300 rounded"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded ${
            page === currentPage
              ? "border-2 border-neutral-400/30 bg-neutral-900 text-neutral-300"
              : "border-2 border-neutral-400/10"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-4 py-2 bg-neutral-900 text-neutral-300 rounded"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
      <input
        type="number"
        value={currentPage}
        onChange={handleInputChange}
        className="px-4 py-2 max-w-[100px] bg-neutral-800 border border-neutral-700/30 rounded"
      />
    </div>
  );
}
