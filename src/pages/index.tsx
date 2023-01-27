import React, { useState, useEffect, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import Fuse from 'fuse.js';
import Head from 'next/head';
import { Card, YearlySection, NoMatch } from '@/components/Card/Card';
import { Layout } from '@/components/Layout/Layout';
import { ShowsByYear, CategoryName } from '@/types';
import {
  localStorageIsAvailable,
  setLocalStorage,
  fetchShows,
  standardizeData,
  categoryName,
} from '@/utils/utils';
type DictionaryType = {
  id: string;
  title: string;
};
export default function Home() {
  const [shows, setShows] = useState<ShowsByYear>({});
  const [filteredList, setFilteredList] = useState<ShowsByYear>({});
  const [yearRange, setYearRange] = useState<Array<number>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<
    Array<Fuse.FuseResult<DictionaryType>>
  >([]);
  const [dictionary, setDictionary] = useState<Array<DictionaryType>>([]);
  const searchEl = useRef(null);
  const fuse = new Fuse(dictionary, {
    isCaseSensitive: false,
    includeMatches: true,
    shouldSort: true,
    keys: ['title'],
  });
  const resetSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
  };
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryStr = e.currentTarget.value;
    setSearchTerm(queryStr);
    if (queryStr === '') {
      setSearchResults([]);
      setSearchTerm('');
      return;
    }
    if (queryStr.length < 4) return;
    const foundTerms: Array<Fuse.FuseResult<DictionaryType>> =
      fuse.search<DictionaryType>(queryStr);
    setSearchResults(foundTerms);
    displaySearchResults();
    console.log(foundTerms);
  };
  const displaySearchResults = () => {
    if (searchResults.length === 0) return null;
    const list = searchResults.map((query) => (
      <li key={query.item.id}>
        <a href={query.item.id}>
          <Highlighter
            searchWords={[...searchTerm]}
            textToHighlight={query.item.title}
          />
        </a>
      </li>
    ));
    return <ul>{list}</ul>;
  };
  const handleYearSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetYear = e.target.value;
    const targetEl = document.querySelector(`#year-${targetYear}`);
    targetEl?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleCategorySelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetCategory = e.target.value;
    if (targetCategory === 'all') return setFilteredList(shows);
    const filteredByCategory = yearRange
      .map((year) => {
        const episodes = shows[year].filter(
          (ep) => ep.category === targetCategory
        );
        return { [year]: [...episodes] };
      })
      .reduce((result, current) => Object.assign(result, current), {});
    for (const year in filteredByCategory) {
      if (filteredByCategory[year].length === 0)
        delete filteredByCategory[year];
    }
    setFilteredList(filteredByCategory);
  };
  useEffect(() => {
    const arr = [];
    for (const years in filteredList) {
      arr.push(...filteredList[years]);
    }
    const dict = arr.map((item) => {
      const { number, title, html } = item;
      return {
        id: `#episode-${number}`,
        title,
      };
    });
    setDictionary(dict);
    // console.log(filteredList, arr);
  }, [filteredList]);
  useEffect(() => {
    if (!localStorageIsAvailable('bald_syntax_saved')) {
      setLocalStorage(
        'bald_syntax_saved',
        JSON.stringify(new Date().getTime())
      );
    }
  }, []);
  useEffect(() => {
    const savedShows = window.localStorage.getItem(
      'bald_syntax_shows'
    ) as string;
    const getFreshShows = () => {
      fetchShows().then((list) => {
        const massagedList = standardizeData(list);
        setShows(massagedList);
        setLocalStorage('bald_syntax_shows', JSON.stringify(massagedList));
      });
    };
    if (!savedShows) {
      getFreshShows();
    } else {
      const lastSaved = parseFloat(
        window.localStorage.getItem('bald_syntax_saved') as string
      );
      const currentTime = new Date().getTime();
      const DAY_IN_MILLISEC = 86400000;
      const isOld = currentTime - lastSaved > DAY_IN_MILLISEC;
      return isOld ? getFreshShows() : setShows(JSON.parse(savedShows));
    }
  }, []);
  useEffect(() => {
    setFilteredList(shows);
    const years = Object.keys(shows)
      .map((year) => parseFloat(year))
      .sort((a, b) => b - a);
    setYearRange(years);
  }, [shows]);
  return (
    <>
      <Head>
        <title>Syntax.fm Podcast: The Missing Browser</title>
        <meta name="description" content="Syntax Podcast browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <aside>
          <h1>
            Syntax.fm Podcast: <span>The Missing Browser</span>
          </h1>
          <div className="filters">
            <h5>Browse By:</h5>
            <div className="filter-item">
              <label htmlFor="year">Year</label>
              <select name="year" id="year" onChange={handleYearSelector}>
                {yearRange.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                onChange={handleCategorySelector}
              >
                <option value="all">All</option>
                {['regular', 'potluck', 'hasty', 'supper'].map((category) => (
                  <option key={category} value={category}>
                    {categoryName(category as CategoryName)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="filters search">
            <label htmlFor="searchBar">Search for:</label>
            <div className="inputbox">
              <input
                type="text"
                ref={searchEl}
                id="searchBar"
                name="searchBar"
                value={searchTerm}
                onChange={handleSearchInput}
                placeholder="Type something..."
              />
              <button>
                <svg
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="14"
                    cy="14"
                    r="11.5"
                    stroke="white"
                    stroke-width="5"
                  />
                  <line
                    x1="23.5355"
                    y1="24"
                    x2="31"
                    y2="31.4645"
                    stroke="white"
                    stroke-width="5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="searchResult" data-active={isSearching}>
              {displaySearchResults()}
            </div>
          </div>
        </aside>
        <main>
          {yearRange.map((year) => {
            const yearlyList = filteredList[year];
            return (
              <YearlySection key={year} id={`year-${year}`}>
                <h2>{year}</h2>
                <div className="cards">
                  {yearlyList &&
                    yearlyList.map((show, i) => {
                      const { number, title, date, slug, html, category } =
                        show;
                      return (
                        <Card
                          key={i}
                          number={number}
                          title={title}
                          date={date}
                          slug={slug}
                          html={html}
                          category={category}
                        />
                      );
                    })}
                </div>
                {!yearlyList && <NoMatch />}
              </YearlySection>
            );
          })}
        </main>
      </Layout>
    </>
  );
}
