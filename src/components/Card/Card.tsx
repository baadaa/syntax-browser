import * as React from 'react';
import styled from 'styled-components';
import { parse } from 'node-html-parser';
import decode from 'html-entities-decoder';
import { CategoryName } from '@/types';
import { nameMonth, categoryName } from '@/utils/utils';

const SectionStyles = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  h2 {
    position: sticky;
    font-size: 3rem;
    top: 1rem;
  }
  article + article {
    margin-top: 2rem;
  }
`;
const CardStyles = styled.article`
  display: grid;
  padding: 2.5rem 3rem;
  grid-gap: 2rem;
  grid-template-columns: 10rem auto 45rem;
  border-radius: 1rem;
  /* box-shadow: var(--base-shadow); */
  max-width: 95rem;
  font-size: 1.4rem;
  line-height: 1.5;
  h3 {
    font-size: 1.8rem;
    line-height: 1.5;
    font-weight: 400;
  }
  ul {
    margin-left: 2rem;
    font-size: 1.2rem;
  }
  strong a {
    font-weight: 600;
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
        <div>
          {month} {day}, {year}
        </div>
        <div>{number}</div>
      </div>
      <div>
        <h3>{title}</h3>
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
          <ul
            dangerouslySetInnerHTML={{
              __html: decode(showNotes.innerHTML),
            }}
          />
        )}
      </div>
    </CardStyles>
  );
};
