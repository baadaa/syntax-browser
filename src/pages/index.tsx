import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Work_Sans } from '@next/font/google';
import {
  localStorageIsAvailable,
  setLocalStorage,
  fetchShows,
  standardizeData,
} from '@/utils/utils';
import { Card, YearlySection } from '@/components/Card/Card';
import { Layout } from '@/components/Layout/Layout';
import { ShowType, ShowsByYear } from '@/types/showTypes';

const ws = Work_Sans({ weight: ['400', '600', '700'], subsets: ['latin'] });

export default function Home() {
  const [shows, setShows] = useState<ShowsByYear>({});
  const [filteredList, setFilteredList] = useState<ShowsByYear>({});
  const [yearRange, setYearRange] = useState<Array<number>>([]);
  const [filteredRange, setFilteredRange] = useState<Array<number>>([]);

  const handleYearFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetYear = parseFloat(e.target.value);
    const filteredByYear = shows[targetYear];
    setFilteredRange([targetYear]);
    setFilteredList({
      [targetYear]: [...filteredByYear],
    });
    console.log(filteredByYear, filteredList);
  };
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
    setFilteredRange(years);
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
          <h5>Browse By:</h5>
          <label htmlFor="year">Year</label>
          <select name="year" id="year" onChange={handleYearFilter}>
            <option value="all">All</option>
            {yearRange.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </aside>
        <main>
          {filteredRange.map((year) => (
            <YearlySection key={year}>
              <h2 id={`year-${year}`}>{year}</h2>
              <div className="cards">
                {filteredList[year].map((show, i) => {
                  const { number, title, date, slug, html, category } = show;
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
            </YearlySection>
          ))}
        </main>
      </Layout>
    </>
  );
}
