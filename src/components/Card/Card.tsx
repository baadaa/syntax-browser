import * as React from 'react';
import { parse } from 'node-html-parser';
import decode from 'html-entities-decoder';
import { CategoryName, Props } from '@/types';
import { nameMonth, categoryName } from '@/utils/utils';
import css from './Card.module.scss';

type CardProps = {
  number: number;
  title: string;
  date: number;
  slug: string;
  html: string;
  category?: string;
};

export const YearlySection: React.FC<Props> = ({ children, id }) => (
  <section className={css.year} id={id}>
    {children}
  </section>
);
export const NoMatch: React.FC<Props> = () => (
  <div className={css.no_match}>
    <span>😢 </span> No episode found under selected category
  </div>
);
export const Card: React.FC<CardProps> = ({
  number,
  title,
  date,
  slug,
  category,
  html,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const showDate = new Date(date);
  const year = showDate.getFullYear();
  const month = nameMonth(showDate.getMonth());
  const day = showDate.getDate();
  const parsedHTML = parse(html);
  const intro = parsedHTML.querySelector('p:first-of-type');
  const showNotes = parsedHTML.querySelector(
    'h2#show-notes + p, h2#show-notes + ul'
  );
  return (
    <article className={css.card} id={`episode-${number}`}>
      <div className={css.catalog}>
        <div className={css.ep}>{number}</div>
        <div className={css.date}>
          {month} {day}, {year}
        </div>
      </div>
      <div className={css.title}>
        <h3>
          <a
            href={`https://syntax.fm${slug}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {title}
          </a>
        </h3>
        <span className={css.category} data-type={category}>
          {categoryName(category as CategoryName)}
        </span>
      </div>
      <div className={css.summary}>
        {intro && (
          <div
            dangerouslySetInnerHTML={{
              __html: decode(intro.innerHTML),
            }}
          />
        )}
        {showNotes && (
          <>
            <button
              data-expanded={isExpanded}
              className={css.toggle}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Close' : 'Open'} show notes
            </button>
            <ul
              data-expanded={isExpanded}
              dangerouslySetInnerHTML={{
                __html: decode(showNotes.innerHTML),
              }}
            />
          </>
        )}
      </div>
    </article>
  );
};
