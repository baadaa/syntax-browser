import * as React from 'react';
import styled from 'styled-components';
import { parse } from 'node-html-parser';
import decode from 'html-entities-decoder';
import { CategoryName, Props } from '@/types';
import { nameMonth, categoryName } from '@/utils/utils';

const SectionStyles = styled.section`
  & + & {
    margin-top: var(--section-spacing);
  }
  padding-top: var(--episode-spacing);
  border-top: 1px solid var(--section-border);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  h2 {
    position: sticky;
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--section-heading-color);
    top: 2rem;
    width: 16rem;
  }
  article + article {
    border-top: 1px solid var(--episode-border);
    margin-top: var(--episode-spacing);
    padding-top: var(--episode-spacing);
  }
`;
const NoMatchStyles = styled.div`
  flex: 1;
  font-size: 2rem;
  line-height: 3rem;
  display: flex;
  font-weight: 400;
  color: var(--error-msg-color);
  span {
    font-size: 1.5em;
    margin-right: 1rem;
  }
  align-items: center;
`;
const CardStyles = styled.article`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 10rem auto 45rem;
  max-width: 90rem;
  font-size: 1.4rem;
  line-height: 1.5;
  /* & > * {
    transition: transform 0.2s;
  }
  &:hover {
    & > * {
      transform: translateX(-2px);
    }
  } */
  .toggle {
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    font-size: 1.4rem;
    background: transparent;
    color: var(--cyan700);
    transform: translate(-1rem);
    border: none;
    border-radius: 3rem;
    outline: none;
    cursor: pointer;
    transition: transform 0.2s;
    &::before {
      content: '📕 ';
    }
    &:focus {
      box-shadow: var(--focus-shadow);
    }
    &:hover {
      transform: translateX(-1rem) translateY(-1px);
    }
    &[data-expanded='true']::before {
      content: '📖 ';
    }
  }
  .ep,
  h3 {
    font-size: 1.8rem;
    line-height: 1.5;
    font-weight: 400;
  }
  .date {
    font-size: 1.2rem;
  }
  h3 a {
    color: var(--cyan700);
    display: inline-block;
    text-decoration: none;
    transition: transform 0.2s;
    outline: none;
    &:hover {
      transform: translateY(-2px);
    }
    &:focus {
      box-shadow: var(--focus-shadow);
    }
  }
  ul {
    margin-top: 1rem;
    border-radius: 1rem;
    background-color: var(--shownotes-bg);
    box-sizing: border-box;
    padding: 0 2rem;
    font-size: 1.2rem;
    max-height: 0;
    visibility: hidden;
    overflow: hidden;
    li {
      margin-left: 1rem;
    }
    li + li {
      margin-top: 0.5rem;
    }
    transition: max-height 0.5s, padding 0.5s;
    &[data-expanded='true'] {
      visibility: visible;
      max-height: 200vh;
      padding: 2rem;
    }
  }
  strong a {
    font-weight: 600;
    text-decoration: none;
    font-family: monospace;
    font-size: 1rem;
    display: inline-block;
    padding: 0.2rem 0.5rem;
    background-color: var(--coolGray200);
  }
  .summary {
    max-width: 50rem;
  }
  .category {
    display: inline-block;
    text-transform: uppercase;
    margin-top: 1rem;
    letter-spacing: 0.06em;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.3rem 0.9rem;
    background-color: var(--cyan100);
    color: var(--cyan700);
    border-radius: 2rem;
    border: 1px solid var(--cyan500);
    &::before {
      content: '🍖 ';
    }
    &[data-type='hasty'] {
      background-color: var(--red100);
      color: var(--red700);
      border-color: var(--red500);
      &::before {
        content: '🍪 ';
      }
    }
    &[data-type='supper'] {
      background-color: var(--green100);
      border-color: var(--green500);
      color: var(--green700);
      &::before {
        content: '🍷 ';
      }
    }
    &[data-type='potluck'] {
      background-color: var(--yellow100);
      border-color: var(--yellow500);
      color: var(--yellow700);
      &::before {
        content: '🍱 ';
      }
    }
  }
`;

type CardProps = {
  number: number;
  title: string;
  date: number;
  slug: string;
  html: string;
  category?: string;
};

export const YearlySection: React.FC<Props> = ({ children, id }) => (
  <SectionStyles id={id}>{children}</SectionStyles>
);
export const NoMatch: React.FC<Props> = () => (
  <NoMatchStyles>
    <span>😢 </span> No episode found under selected category
  </NoMatchStyles>
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
    <CardStyles id={`episode-${number}`}>
      <div>
        <div className="ep">{number}</div>
        <div className="date">
          {month} {day}, {year}
        </div>
      </div>
      <div>
        <h3>
          <a
            href={`https://syntax.fm${slug}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {title}
          </a>
        </h3>
        <span className="category" data-type={category}>
          {categoryName(category as CategoryName)}
        </span>
      </div>
      <div className="summary">
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
              className="toggle"
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
    </CardStyles>
  );
};
