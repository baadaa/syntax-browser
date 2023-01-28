import * as React from 'react';
import Highlighter from 'react-highlight-words';
import Fuse from 'fuse.js';
import { DictionaryType, SearchProps, SearchOptions } from '@/types';

const fuseOption = {
  isCaseSensitive: false,
  includeMatches: true,
  shouldSort: true,
  minMatchCharLength: 2,
  threshold: 1,
  distance: 5,
};

export const SearchBox: React.FC<SearchProps> = ({ dictionary }) => {
  const searchEl = React.useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBy, setSearchBy] = React.useState<SearchOptions>('title');
  const [isEntered, setIsEntered] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<
    Array<Fuse.FuseResult<DictionaryType>>
  >([]);

  const fuseTitle = new Fuse(dictionary, {
    ...fuseOption,
    keys: ['title'],
  });
  const fuseText = new Fuse(dictionary, {
    ...fuseOption,
    minMatchCharLength: 4,
    keys: ['text'],
  });
  const resetSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsEntered(false);
  };
  const triggerSearch = () => {
    if (searchTerm.length < 4) return;
    setIsEntered(true);
    const foundTitles: Array<Fuse.FuseResult<DictionaryType>> =
      fuseTitle.search<DictionaryType>(searchTerm.trim());
    const foundNotes: Array<Fuse.FuseResult<DictionaryType>> =
      fuseText.search<DictionaryType>(searchTerm.trim());
    setSearchResults(searchBy === 'title' ? foundTitles : foundNotes);
    displaySearchResults();
  };
  const toggleSearchOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBy(e.target.value as SearchOptions);
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
        setSearchResults([]);
        setIsEntered(false);
        break;
    }
  };
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryStr = e.currentTarget.value;
    setSearchTerm(queryStr.replaceAll('\\', ''));
  };
  const displaySearchResults = () => {
    if (searchResults.length === 0) return null;
    const list = searchResults.map((query) => (
      <li key={query.item.hash}>
        <a href={query.item.hash}>
          <>
            {query.item.number} -{' '}
            {searchBy === 'title' && (
              <Highlighter
                searchWords={[...searchTerm]}
                textToHighlight={query.item[searchBy]}
              />
            )}
            {searchBy === 'text' && (
              <Highlighter
                searchWords={[searchTerm]}
                textToHighlight={query.item[searchBy]}
              />
            )}
          </>
        </a>
      </li>
    ));
    return <ul>{list}</ul>;
  };
  React.useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);
  React.useEffect(() => {
    if (!isEntered) setSearchResults([]);
  }, [searchTerm, isEntered]);
  return (
    <div className="filters search">
      <h5>Search for:</h5>
      <div className="inputbox">
        <input
          type="text"
          ref={searchEl}
          id="searchBar"
          name="searchBar"
          value={searchTerm}
          onChange={handleSearchInput}
          onKeyUp={checkSpecialKey}
          placeholder="Type something..."
        />
        {searchTerm && (
          <button className="cancel" onClick={resetSearch} tabIndex={-1}>
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
      <form className="radios">
        <input
          type="radio"
          name="searchBy"
          id="byTitle"
          value="title"
          checked={searchBy === 'title'}
          onChange={toggleSearchOption}
        />
        <label htmlFor="byTitle">Title</label>
        <input
          type="radio"
          name="searchBy"
          id="byShowNote"
          value="text"
          checked={searchBy === 'text'}
          onChange={toggleSearchOption}
        />
        <label htmlFor="byShowNote">Show Note</label>
      </form>
      <div className="searchResult" data-active={isEntered}>
        {displaySearchResults()}
      </div>
    </div>
  );
};
