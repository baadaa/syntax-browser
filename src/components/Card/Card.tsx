import * as React from 'react';
import { parse } from 'node-html-parser';
import decode from 'html-entities-decoder';
import { CategoryName, Props } from '@/types';
import { nameMonth, categoryName } from '@/utils/utils';
import css from './Card.module.scss';

type CardProps = {
  number?: number;
  id?: number;
  title?: string;
  date?: number;
  slug?: string;
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
export const EpisodeCard: React.FC<CardProps> = ({
  number,
  title,
  date = 12345789,
  slug = '',
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
  const showNotes = parsedHTML
    .querySelectorAll(
      `h2#show-notes ~ *:not(h2), 
       h2#the-show-notes ~ *:not(h2), 
       h2#the-buzz-words ~ *:not(h2)`
    )
    .map((el) => el.innerHTML)
    .join('');
  const processSlug = () => {
    const str = slug.split('/');
    switch (str[2].length) {
      case 1:
        str[2] = '00' + str[2];
        break;
      case 2:
        str[2] = '0' + str[2];
        break;
      default:
        break;
    }
    return str.join('/');
  };
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
            href={`https://syntax.fm${processSlug()}`}
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
          <button
            data-expanded={isExpanded}
            className={css.toggle}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Close' : 'Open'} show notes
          </button>
        )}
        <a
          href={`https://syntax.fm${processSlug()}`}
          target="_blank"
          rel="noreferrer noopener"
          className={css.toggle}
          data-type="launch"
        >
          Launch episode
        </a>
        {showNotes && (
          <ul
            className={css.episode}
            data-expanded={isExpanded}
            dangerouslySetInnerHTML={{
              __html: decode(showNotes),
            }}
          />
        )}
      </div>
    </article>
  );
};

export const SickPickCard: React.FC<CardProps> = ({ id, html }) => {
  const parsedHTML = parse(html);
  const content = parsedHTML.querySelector(`ul`)?.innerHTML;

  return (
    <article className={`${css.card} ${css.pick}`} key={id} id={`pick-${id}`}>
      <div className={css.catalog}>
        <div className={css.ep} data-pick="true">
          {id}
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: decode(content || '') }}></div>
    </article>
  );
};
