import React, { useState, useEffect } from 'react';
import { parse } from 'node-html-parser';
import Head from 'next/head';
import { SickPickCards, EpisodeCards } from '@/components/Card';
import { Layout } from '@/components/Layout';
import { Aside, FilterBox, SearchBox } from '@/components/Aside';
import { ShowsByYear, PickType, DictionaryType, FetchDataSet } from '@/types';
import {
  localStorageIsAvailable,
  setLocalStorage,
  fetchData,
  standardizeEpisodes,
} from '@/utils/utils';

export default function Home() {
  const [shows, setShows] = useState<ShowsByYear>({});
  const [picks, setPicks] = useState<Array<PickType>>([]);
  const [browseBy, setBrowseBy] = useState<FetchDataSet>('shows');
  const [filteredList, setFilteredList] = useState<ShowsByYear>({});
  const [yearRange, setYearRange] = useState<Array<number>>([]);
  const [showDictionary, setShowDictionary] = useState<Array<DictionaryType>>(
    []
  );
  const [pickDictionary, setPickDictionary] = useState<Array<DictionaryType>>(
    []
  );

  // Scroll to the selected year section
  const handleYearSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetYear = e.target.value;
    const targetEl = document.querySelector(`#year-${targetYear}`);
    targetEl?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter the episode list by category
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

  const persistLastSaved = () =>
    setLocalStorage('bald_syntax_saved', JSON.stringify(new Date().getTime()));

  // Each time category filter changes, update the dictionary to search against
  useEffect(() => {
    const arr = [];
    for (const years in filteredList) {
      arr.push(...filteredList[years]);
    }
    const dict = arr.map((item) => {
      const { number, title, html } = item;
      const text = parse(html).innerText;
      return {
        number,
        hash: `#episode-${number}`,
        title,
        text,
      };
    });
    setShowDictionary(dict);
  }, [filteredList]);

  // Set search dictionary for Sick Picks
  useEffect(() => {
    const dict = picks.map((item) => {
      const { id, html } = item;
      const text = parse(html).querySelector(`ul`)?.innerText;
      return {
        number: id,
        hash: `#pick-${id}`,
        pick: text,
      };
    });
    setPickDictionary(dict);
  }, [picks]);

  // If the "last saved" timestamp doesn't exist, add one
  useEffect(() => {
    if (!localStorageIsAvailable('bald_syntax_saved')) {
      persistLastSaved();
    }
  }, []);

  // Check any existing local data and its saved timestamp and decide whether to fetch fresh data
  useEffect(() => {
    const savedShows = window.localStorage.getItem(
      'bald_syntax_shows'
    ) as string;
    const savedPicks = window.localStorage.getItem(
      'bald_syntax_picks'
    ) as string;

    // Whenever fetching new data, save the timestamp
    const getFreshData = () => {
      fetchData('shows').then((list) => {
        const massagedList = standardizeEpisodes(list);
        setShows(massagedList);
        setLocalStorage('bald_syntax_shows', JSON.stringify(massagedList));
      });
      fetchData('sick picks').then((list) => {
        setPicks(list);
        setLocalStorage('bald_syntax_picks', JSON.stringify(list));
      });
      persistLastSaved();
    };
    const restoreSavedData = () => {
      setShows(JSON.parse(savedShows));
      setPicks(JSON.parse(savedPicks));
    };
    if (!savedShows || !savedPicks) {
      // If local data doesn't exist (i.e. first time loading), get fresh data
      getFreshData();
    } else {
      // If local data exist but it's more than a day old, get fresh data.
      // If local data was fetched less than a day before, use the local data.
      const lastSaved = parseFloat(
        window.localStorage.getItem('bald_syntax_saved') as string
      );
      const currentTime = new Date().getTime();
      const DAY_IN_MILLISEC = 86400000;
      const isOld = currentTime - lastSaved > DAY_IN_MILLISEC;
      isOld ? getFreshData() : restoreSavedData();
    }
  }, []);

  // Each time the show data is refreshed, organize it by released year
  useEffect(() => {
    setFilteredList(shows);
    const years = Object.keys(shows)
      .map((year) => parseFloat(year))
      .sort((a, b) => b - a);
    setYearRange(years);
  }, [shows]);

  // Each time browse target changes, scroll to the top
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [browseBy]);
  return (
    <>
      <Head>
        <title>Syntax Podcast: The Missing Browser</title>
        <meta name="description" content="Syntax Podcast browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/barbecue.png" />
      </Head>
      <Layout>
        <Aside>
          <FilterBox
            browseBy={browseBy}
            setBrowseBy={setBrowseBy}
            yearRange={yearRange}
            handleCategorySelector={handleCategorySelector}
            handleYearSelector={handleYearSelector}
          />
          <SearchBox
            dictionary={browseBy === 'shows' ? showDictionary : pickDictionary}
            browseBy={browseBy}
          />
        </Aside>
        <main>
          <EpisodeCards
            browseBy={browseBy}
            yearRange={yearRange}
            filteredList={filteredList}
          />
          <SickPickCards browseBy={browseBy} pickList={picks} />
        </main>
      </Layout>
    </>
  );
}
