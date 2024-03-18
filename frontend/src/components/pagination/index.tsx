import { times } from 'lodash';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';

interface Props {
  total: number;
  limit: number;
  goToPage: (e: number) => void;
}

export const Pagination: FC<Props> = ({ total, limit, goToPage }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const goToPrev = (): void => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  const goToNext = (): void => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const goToPageNo = (e: number): void => setCurrentPage(e);

  useEffect(() => {
    goToPage(currentPage);
  }, [currentPage]);

  if (totalPages <= 1) return <Fragment />;
  return (
    <div className="w-full flex justify-center mt-2 text-secondary">
      <div
        className={`
          ${
            currentPage <= 0 && 'text-gray-400 select-none cursor-not-allowed'
          } px-2 cursor-pointer
        `}
        onClick={goToPrev}
      >
        &lt;
      </div>
      {times(totalPages, (i) => (
        <div
          key={i}
          className={`px-3 cursor-pointer ${
            currentPage === i && 'text-primary'
          }`}
          onClick={(): void => goToPageNo(i)}
        >
          {i + 1}
        </div>
      ))}
      <div
        className={`
          ${
            currentPage >= totalPages - 1 &&
            'text-gray-400 select-none cursor-not-allowed'
          } px-2 cursor-pointer
        `}
        onClick={goToNext}
      >
        &gt;
      </div>
    </div>
  );
};
export default Pagination;
