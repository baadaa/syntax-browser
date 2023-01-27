import * as React from 'react';
import styled from 'styled-components';
import { Props } from '@/types';
import { Work_Sans } from '@next/font/google';

const ws = Work_Sans({ subsets: ['latin'] });

const LayoutStyles = styled.div`
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: var(--max-width);
  aside {
    max-width: 30rem;
  }
  main {
    max-width: 1024px;
  }
  h5,
  .filters.search label {
    display: block;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    margin-bottom: 1rem;
    text-transform: uppercase;
    color: var(--section-heading-color);
  }
  label {
    font-size: 1.3rem;
    display: inline-block;
  }
  select,
  option,
  input {
    font-size: 1.6rem;
    padding: 0.5rem;
    outline: none;
    font-family: inherit;
    background-color: var(--input-bg);
    &:focus {
      box-shadow: var(--focus-shadow);
    }
    border: 1px solid var(--section-border);
  }
  input {
    width: 100%;
    margin: 0;
    padding-right: 4rem;
    box-sizing: border-box;
  }
  .inputbox {
    position: relative;
    button {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      border: none;
      outline: none;
      background-color: var(--search-btn-bg);
      &:focus {
        box-shadow: var(--focus-shadow);
      }
      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
  .filters {
    margin-top: 2rem;
    padding: 2rem;
    background: var(--filter-box-bg);
    border-radius: 1.2rem;
    box-shadow: var(--base-shadow);
  }
  .search {
    position: relative;
    label {
      position: sticky;
      top: 0;
    }
    .inputbox {
      position: sticky;
      top: 2.5rem;
    }
    .searchResult {
      margin-top: 1rem;
      max-height: 30rem;
      overflow-y: auto;
    }
  }
  .filter-item {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 3fr;
    align-items: center;
  }
`;

export const Layout: React.FC<Props> = ({ children }) => (
  <LayoutStyles className={ws.className}>{children}</LayoutStyles>
);
