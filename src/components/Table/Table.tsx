import * as React from 'react';
import styled from 'styled-components';

const TdStyles = styled.td`
  padding: 1rem;
  vertical-align: top;
  line-height: 1.5;
  a {
    text-decoration: underline;
  }
  strong a {
    font-weight: 400;
    font-family: monospace;
    background-color: var(--coolGray200);
    border-radius: 0.4rem;
    padding: 0.15rem 0.6rem;
    font-size: 1rem;
    font-weight: 700;
    display: inline-block;
  }
  li p {
    display: inline-block;
  }
  ul {
    margin-left: 1.5rem;
  }
`;
const ThStyles = styled.th`
  padding: 1rem;
  font-size: 1.2rem;
  line-height: 1;
  color: var(--table-heading-text);
  background-color: var(--table-heading-bg);
  position: sticky;
  top: 3.4rem;
  text-transform: uppercase;
  &[data-date] {
    width: 10rem;
  }
`;
const TableStyles = styled.table`
  font-weight: 400;
  font-size: 1.6rem;
  position: relative;
  border-collapse: collapse;
  /* border: 1px solid var(--table-border); */
  tbody {
  }
  tr {
    background-color: var(--table-cell-bg);
  }
  tr + tr {
    border-top: 1px solid var(--table-border);
  }
  td + td {
    border-left: 1px solid var(--table-border);
  }
`;

type TableProps = {
  children?: React.ReactNode;
  columnWidth?: string;
};
export const Table: React.FC<TableProps> = ({ children }) => (
  <TableStyles>{children}</TableStyles>
);

export const Th: React.FC<TableProps> = ({ children, columnWidth }) => (
  <ThStyles style={{ width: columnWidth }}>{children}</ThStyles>
);
export const Td: React.FC<TableProps> = ({ children }) => (
  <TdStyles>{children}</TdStyles>
);
