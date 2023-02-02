import * as React from 'react';
import Fuse from 'fuse.js';
import { fuseOption, MIN_QUERY_LENGTH } from './searchOptions';
import { IconCancel, IconSearch } from './Icons';
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

export const SearchBox: React.FC<SearchProps> = ({ dictionary, browseBy }) => {
  const searchEl = React.useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isEntered, setIsEntered] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<
    Array<Fuse.FuseResult<DictionaryType>>
  >([]);
  console.log(dictionary);
  const fuseTitle = new Fuse(dictionary, {
    ...fuseOption,
    keys: ['title', 'pick'],
  });
  const resetSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsEntered(false);
    setErrorMessage('');
  };
  const triggerSearch = () => {
    if (searchTerm.trim().length < MIN_QUERY_LENGTH)
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
        setErrorMessage('');
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

  // Each time browse target changes, reset search bar
  React.useEffect(() => {
    resetSearch();
  }, [browseBy]);

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
            <IconCancel />
          </button>
        )}
        <button onClick={triggerSearch}>
          <IconSearch />
        </button>
      </div>
      {errorMessage && <div className={css.error}>{errorMessage}</div>}
      <div className={css.searchResult} data-active={isEntered}>
        {displaySearchResults()}
      </div>
    </div>
  );
};
