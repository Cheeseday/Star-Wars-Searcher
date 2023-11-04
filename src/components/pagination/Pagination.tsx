import React, { ChangeEvent } from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../../hoc/usePagination';
import './pagination.scss';

type Props = {
  onPageChange: (page: number) => void;
  onPageSizeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: string;
  className: string;
};

const Pagination: React.FC<Props> = (props) => {
  const {
    onPageChange,
    onPageSizeChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="pagination-item dots">
              &#8230;
            </li>
          );
        }
        if (typeof pageNumber === 'number') {
          return (
            <li
              key={index}
              className={classnames('pagination-item', {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        }
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
      <li>
        <label htmlFor="pageSize">Items: </label>
        <select id="pageSize" defaultValue={20} onChange={onPageSizeChange}>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </li>
    </ul>
  );
};

export default Pagination;
