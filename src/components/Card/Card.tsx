import * as React from 'react';
import styled from 'styled-components';
import { parse } from 'node-html-parser';
import decode from 'html-entities-decoder';

const CardStyles = styled.article`
  display: flex;
  max-width: 800px;
`;

type CardProps = {
  number: number;
  title: string;
  date: number;
  slug: string;
  html: string;
};

export const EpisodeCard: React.FC<CardProps> = ({
  number,
  title,
  date,
  slug,
  html,
}) => {
  const showDate = new Date(date);
  const year = showDate.getFullYear();
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][showDate.getMonth()];
  const day = showDate.getDate();
  const parsedHTML = parse(html);
  const intro = parsedHTML.querySelector('p:first-of-type');
  const showNotes = parsedHTML.querySelector(
    'h2#show-notes + p, h2#show-notes + ul'
  );
  return (
    <CardStyles>
      <div>
        {month} {day}, {year}
      </div>
      <div>{number}</div> <h3>{title}</h3>
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
    </CardStyles>
  );
};
