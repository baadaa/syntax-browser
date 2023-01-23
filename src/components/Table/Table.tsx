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
    padding: 0.1rem 0.4rem;
    font-size: 0.6rem;
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

const TableStyles = styled.table`
  font-weight: 400;
  position: relative;
  border: 1px solid var(--coolGray200);
  thead > tr {
    background-color: var(--coolGray800);
    color: #fff;
  }
  thead {
    position: sticky;
    top: 0;
  }
  tbody {
  }
  tr {
    background-color: var(--coolGray50);
    background-color: #fff;
  }
  tr:nth-of-type(2n) {
    background-color: var(--coolGray50);
  }
`;

type TableProps = {
  children?: React.ReactNode;
};
export const Table: React.FC<TableProps> = ({ children }) => (
  <TableStyles>{children}</TableStyles>
);

export const Td: React.FC<TableProps> = ({ children }) => (
  <TdStyles>{children}</TdStyles>
);
