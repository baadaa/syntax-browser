import * as React from 'react';
import Fuse from 'fuse.js';
import { fuseOption, MIN_QUERY_LENGTH } from './searchOptions';
import { DictionaryType, SearchProps } from '@/types';
import css from './Aside.module.scss';

type HighlightProps = {
  matches: Array<Fuse.FuseResultMatch>;
};
const HighlightText: React.FC<HighlightProps> = ({ matches }) => {
  // highlighting method adopted from
  // https://dev.to/noclat/using-fuse-js-with-react-to-build-an-advanced-search-with-highlighting-4b93

  const match = matches[0];
  const highlight = (
    value = '',
    indices: Array<Fuse.RangeTuple>,
    i = 1
  ): React.ReactNode => {
    const pair = indices[indices.length - i];
    return !pair ? (
      value
    ) : (
      <>
        {highlight(value.substring(0, pair[0]), indices, i + 1)}
        <mark>{value.substring(pair[0], pair[1] + 1)}</mark>
        {value.substring(pair[1] + 1)}
      </>
    );
  };
  return <>{highlight(match.value, match.indices as Array<Fuse.RangeTuple>)}</>;
};

export const SearchBox: React.FC<SearchProps> = ({ dictionary }) => {
  const searchEl = React.useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isEntered, setIsEntered] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<
    Array<Fuse.FuseResult<DictionaryType>>
  >([]);

  const fuseTitle = new Fuse(dictionary, {
    ...fuseOption,
    keys: ['title'],
  });
  const resetSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsEntered(false);
    setErrorMessage('');
  };
  const triggerSearch = () => {
    if (searchTerm.length < MIN_QUERY_LENGTH)
      return setErrorMessage(`Provide at least ${MIN_QUERY_LENGTH} characters`);
    const foundTitles: Array<Fuse.FuseResult<DictionaryType>> =
      fuseTitle.search<DictionaryType>(searchTerm.trim());
    if (foundTitles.length === 0) {
      setErrorMessage('No matching results found');
      return;
    }
    setSearchResults(foundTitles);
    setIsEntered(true);
    displaySearchResults();
  };
  const checkSpecialKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    switch (key) {
      case 'Escape':
        resetSearch();
        break;
      case 'Enter':
        triggerSearch();
        break;
      default:
        setIsEntered(false);
        break;
    }
  };
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryStr = e.currentTarget.value;
    setSearchTerm(queryStr.replaceAll('\\', ''));
  };
  const displaySearchResults = () => {
    const list = searchResults.map((hit) => (
      <li key={hit.item.hash}>
        <a href={hit.item.hash}>
          <>
            {hit.item.number} -{' '}
            <HighlightText
              matches={hit.matches as Array<Fuse.FuseResultMatch>}
            />
          </>
        </a>
      </li>
    ));
    return <ul>{list}</ul>;
  };

  React.useEffect(() => {
    if (!isEntered) setSearchResults([]);
  }, [searchTerm, isEntered]);
  return (
    <div className={`${css.filters} ${css.search}`}>
      <h5>Search for:</h5>
      <div className={css.inputbox}>
        <input
          type="text"
          ref={searchEl}
          id="searchBar"
          name="searchBar"
          value={searchTerm}
          onChange={handleSearchInput}
          onKeyUp={checkSpecialKey}
          placeholder="Type something..."
          style={{
            boxShadow: errorMessage ? 'var(--error-shadow)' : undefined,
          }}
        />
        {searchTerm && (
          <button className={css.cancel} onClick={resetSearch} tabIndex={-1}>
            <svg
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="#000"
                strokeWidth="5"
                strokeLinecap="round"
                d="m2.5 3 17.7 17.7M20.5 3 2.8 20.7"
              />
            </svg>
          </button>
        )}
        <button onClick={triggerSearch}>
          <svg
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="14" cy="14" r="11.5" stroke="white" strokeWidth="5" />
            <line
              x1="23.5355"
              y1="24"
              x2="31"
              y2="31.4645"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {errorMessage && <div className={css.error}>{errorMessage}</div>}
      <div className={css.searchResult} data-active={isEntered}>
        {displaySearchResults()}
      </div>
    </div>
  );
};
