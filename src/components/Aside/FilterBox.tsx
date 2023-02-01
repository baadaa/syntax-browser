import * as React from 'react';
import { CategoryName } from '@/types';
import { categoryName } from '@/utils/utils';
import css from './Aside.module.scss';

type FilterProps = {
  yearRange: Array<number>;
  handleYearSelector: React.ChangeEventHandler;
  handleCategorySelector: React.ChangeEventHandler;
};
export const FilterBox: React.FC<FilterProps> = ({
  yearRange,
  handleYearSelector,
  handleCategorySelector,
}) => {
  return (
    <div className={css.filters}>
      <h5>Browse By:</h5>
      <div className={css.filter_item}>
        <label htmlFor="year">Year</label>
        <select name="year" id="year" onChange={handleYearSelector}>
          {yearRange.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label htmlFor="category">Category</label>
        <select name="category" id="category" onChange={handleCategorySelector}>
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
