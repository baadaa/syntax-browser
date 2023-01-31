import * as React from 'react';
import styled from 'styled-components';
import { Props } from '@/types';
const AsideStyles = styled.aside`
  max-width: 30rem;
  h5 {
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
    padding-right: 5.5rem;
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
      cursor: pointer;
      outline: none;
      transition: background-color 0.2s;
      background-color: var(--search-btn-bg);
      &:focus {
        box-shadow: var(--focus-shadow);
      }
      &:hover {
        background-color: var(--search-btn-hover-bg);
      }
      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    button.cancel {
      right: 3rem;
      background: none;
      background-color: transparent;
      svg {
        width: 1rem;
        height: 1rem;
      }
      &:focus {
        box-shadow: none;
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
      display: none;
    }
    .searchResult[data-active='true'] {
      display: block;
    }
    .error {
      color: var(--error-message-color);
      margin-top: 1rem;
    }
  }
  .filter-item {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 3fr;
    align-items: center;
  }
  @media screen and (max-width: 1140px) {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    max-width: 100%;
    h1 {
      box-shadow: var(--base-shadow);
      padding: 0.5rem;
      background-color: #fff;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      font-weight: 500;
      font-size: 2.5rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: baseline;
      span {
        margin-left: 1rem;
        font-size: 0.7em;
        letter-spacing: 0.15em;
      }
    }
    .set {
      transform: translateX(20rem);
      width: 30rem;
      position: absolute;
      top: 5rem;
      right: 1rem;
    }
    .filters {
    }
  }
  @media screen and (max-width: 750px) {
    h1 {
      font-size: 2.2rem;
      span {
        font-size: 0.6em;
      }
    }
  }
`;

export const Aside: React.FC<Props> = ({ children }) => (
  <AsideStyles>{children}</AsideStyles>
);
