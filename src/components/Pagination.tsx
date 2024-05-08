import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdOutlineSkipNext,
  MdOutlineSkipPrevious,
} from 'react-icons/md';

export interface PaginationType {
  totalPages: number;
  hasMore: boolean;
  handlePage: (x: number) => void;
  currentPage: number;
  isPlaceHolder: boolean;
}

export default function Pagination({
  totalPages,
  hasMore,
  handlePage,
  currentPage,
  isPlaceHolder,
}: PaginationType) {
  return (
    <div className="flex items-center text-lg gap-2 justify-center mt-4 text-slate-600 w-full">
      <button onClick={() => handlePage(1)}>
        <MdOutlineSkipPrevious />
      </button>
      <button
        onClick={() => handlePage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 0}
      >
        <MdArrowBackIosNew />
      </button>
      <div>{currentPage}</div>/<div>{totalPages}</div>
      <button
        onClick={() => {
          if (!isPlaceHolder && hasMore) {
            handlePage(currentPage + 1);
          }
        }}
        disabled={isPlaceHolder || !hasMore}
      >
        <MdArrowForwardIos />
      </button>
      <button onClick={() => handlePage(totalPages)}>
        <MdOutlineSkipNext />
      </button>
    </div>
  );
}
