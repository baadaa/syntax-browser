import * as React from 'react';
import styled from 'styled-components';
import { parse } from 'node-html-parser';
import decode from 'html-entities-decoder';
import { CategoryName } from '@/types';
import { nameMonth, categoryName } from '@/utils/utils';

const SectionStyles = styled.section`
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid var(--coolGray200);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  h2 {
    position: sticky;
    font-size: 3rem;
    top: 1rem;
  }
  article + article {
    border-top: 1px solid var(--coolGray200);
    margin-top: 4rem;
    padding-top: 4rem;
  }
`;
const CardStyles = styled.article`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 10rem auto 45rem;
  border-radius: 1rem;
  max-width: 90rem;
  font-size: 1.4rem;
  line-height: 1.5;
  .toggle {
    padding: 0.5rem 0.2rem;
    font-size: 1.4rem;
    background: transparent;
    color: var(--cyan700);
    border: none;
    outline: none;
    cursor: pointer;
    transition: transform 0.2s;
    &::before {
      content: '📕 ';
    }
    &:focus {
      box-shadow: 0 2px 15px rgba(50, 200, 240, 0.5);
    }
    &:hover {
      transform: translateX(2px);
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
  h3 a {
    color: var(--cyan700);
    display: inline-block;
    text-decoration: none;
    transition: transform 0.2s;
    &:hover {
      transform: translateY(-2px);
    }
  }
  ul {
    margin-top: 1rem;
    border-radius: 1rem;
    background-color: var(--coolGray100);
    box-sizing: border-box;
    padding: 0 2rem;
    font-size: 1.2rem;
    max-height: 0;
    overflow: hidden;
    li {
      margin-left: 1rem;
    }
    li + li {
      margin-top: 0.5rem;
    }
    transition: max-height 0.5s, padding 0.5s;
    &[data-expanded='true'] {
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
    letter-spacing: 0.04em;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.3rem 0.9rem;
    background-color: var(--cyan100);
    color: var(--cyan800);
    border-radius: 2rem;
    border: 1px solid var(--cyan500);
    &[data-type='hasty'] {
      background-color: var(--red100);
      color: var(--red800);
      border-color: var(--red500);
      &::before {
        content: '🍪 ';
      }
    }
    &[data-type='supper'] {
      background-color: var(--green100);
      border-color: var(--green500);
      color: var(--green800);
      &::before {
        content: '🍪 ';
      }
    }
    &[data-type='potluck'] {
      background-color: var(--yellow100);
      border-color: var(--yellow500);
      color: var(--yellow800);
      &::before {
        content: '🍪 ';
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
type Props = {
  children: React.ReactNode;
};
export const YearlySection: React.FC<Props> = ({ children }) => (
  <SectionStyles>{children}</SectionStyles>
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
    <CardStyles>
      <div>
        <div className="ep">{number}</div>
        <div>
          {month} {day}, {year}
        </div>
      </div>
      <div>
        <h3>
          <a href={slug} target="_blank" rel="noreferrer noopener">
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
        <br />
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
