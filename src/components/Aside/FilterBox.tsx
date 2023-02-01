import * as React from 'react';
import { CategoryName, FetchDataSet } from '@/types';
import { categoryName } from '@/utils/utils';
import css from './Aside.module.scss';

type FilterProps = {
  browseBy: FetchDataSet;
  setBrowseBy: React.Dispatch<React.SetStateAction<FetchDataSet>>;
  yearRange: Array<number>;
  handleYearSelector: React.ChangeEventHandler;
  handleCategorySelector: React.ChangeEventHandler;
};
export const FilterBox: React.FC<FilterProps> = ({
  yearRange,
  handleYearSelector,
  handleCategorySelector,
  browseBy,
  setBrowseBy,
}) => {
  const toggleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value as FetchDataSet;
    setBrowseBy(target);
  };
  return (
    <div className={css.filters}>
      <h5>Browse By:</h5>
      <div className={css.radios}>
        {['shows', 'sick picks'].map((item) => (
          <div className={css.elem} key={item}>
            <input
              type="radio"
              name="browseBy"
              id={item}
              value={item}
              checked={item === browseBy}
              onChange={toggleRadio}
            />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>
      <div className={css.filter_item}>
        <label htmlFor="year">Year</label>
        <select
          name="year"
          id="year"
          onChange={handleYearSelector}
          disabled={browseBy === 'sick picks'}
        >
          {yearRange.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          onChange={handleCategorySelector}
          disabled={browseBy === 'sick picks'}
        >
          <option value="all">All</option>
          {['regular', 'potluck', 'hasty', 'supper'].map((category) => (
            <option key={category} value={category}>
              {categoryName(category as CategoryName)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
