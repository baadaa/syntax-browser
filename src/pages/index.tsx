import { useState, useEffect } from 'react';
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
import { ShowType, ShowsByYear } from '@/types/showTypes';

const ws = Work_Sans({ weight: ['400', '600', '700'], subsets: ['latin'] });

export default function Home() {
  const [shows, setShows] = useState<ShowsByYear>({});
  const [yearRange, setYearRange] = useState<Array<number>>([]);

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
    const years = Object.keys(shows)
      .map((year) => parseFloat(year))
      .sort((a, b) => b - a);
    setYearRange(years);
  }, [shows]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Syntax Podcast browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={ws.className}
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {yearRange.map((year) => (
          <YearlySection key={year}>
            <h2 id={`year-${year}`}>{year}</h2>
            <div className="cards">
              {shows[year].map((show, i) => {
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
    </>
  );
}
