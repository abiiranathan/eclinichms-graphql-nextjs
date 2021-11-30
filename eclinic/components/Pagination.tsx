import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";
import React from "react";

interface PaginationProps {
  page: number;
  count: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
  hasPrevious: boolean;
  hasNext: boolean;
}

export default function Pagination({
  page,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  count,
  totalPages,
  className,
}: PaginationProps) {
  return (
    <div
      className={`flex whitespace-nowrap items-center gap-4 pagination px-2 py-2 ${
        className || ""
      }`}
    >
      <button
        className={`btn py-1 bg-transparent  px-2 ${className ?? ""}`}
        onClick={onPrevious}
        disabled={!hasPrevious}
      >
        <ChevronDoubleLeftIcon height={12} />
      </button>

      <span className="inline-block mx-4">
        {page} / {totalPages} page{totalPages !== 1 && "s"} -{" "}
      </span>

      <span className="inline-flex justify-items-center items-center p-2 rounded-full bg-regal-blue text-white">
        {count}
      </span>

      <button
        className={`btn  bg-transparent py-1 px-2 ${className ?? ""}`}
        onClick={onNext}
        disabled={!hasNext}
      >
        <ChevronDoubleRightIcon height={12} />
      </button>
    </div>
  );
}
