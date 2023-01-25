import { useState, useEffect } from 'react';
import { parse } from 'node-html-parser';
import decode from 'html-entities-decoder';
import Head from 'next/head';
import Image from 'next/image';
import { Work_Sans } from '@next/font/google';
import {
  localStorageIsAvailable,
  setLocalStorage,
  groupByYear,
} from '@/utils/utils';
import { Table, Td, Th } from '@/components/Table/Table';
import { EpisodeCard } from '@/components/Card/Card';

const ws = Work_Sans({ weight: ['400', '700'], subsets: ['latin'] });

export default function Home() {
  const [shows, setShows] = useState([]);
  const [showByYear, setShowsByYear] = useState({});
  const [yearRange, setYearRange] = useState<Array<number>>([]);
  const fetchShows = async () => {
    const response = await fetch('https://syntax.fm/api/shows');
    const shows = await response.json();
    return shows;
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
        setShows(list);
        setLocalStorage('bald_syntax_shows', JSON.stringify(list));
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
    setShowsByYear(groupByYear(shows));
  }, [shows]);
  useEffect(() => {
    const years = Object.keys(showByYear)
      .map((year) => parseFloat(year))
      .sort((a, b) => b - a);
    setYearRange(years);
  }, [showByYear]);
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
        {shows.map((show, i) => {
          const { number, title, date, slug, html } = show;
          return (
            <EpisodeCard
              key={i}
              number={number}
              title={title}
              date={date}
              slug={slug}
              html={html}
            />
          );
        })}
        {/* <h1>Syntax Podcast: The Missing Browser</h1>
        <Table>
          <thead>
            <tr>
              <Th>#</Th>
              <Th columnWidth="15rem">Date</Th>
              <Th columnWidth="30rem">Title</Th>
              <Th>Summary</Th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show, i) => {
              const { number, title, displayDate, slug, html } = show;
              const parsedHTML = parse(html);
              const intro = parsedHTML.querySelector('p:first-of-type');
              const showNotes = parsedHTML.querySelector(
                'h2#show-notes + p, h2#show-notes + ul'
              );
              return (
                <tr key={i}>
                  <Td>{number}</Td>
                  <Td>{displayDate}</Td>
                  <Td> */}
        {/* <a
                      href={`https://syntax.fm/${slug}`}
                      rel="noreferrer noopener"
                      target="_blank"
                    > */}
        {/* {title} */}
        {/* </a> */}
        {/* </Td>
                  <Td>
                    {intro && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: decode(intro.innerHTML),
                        }}
                      />
                    )}
                    <br />
                    {showNotes && (
                      <ul
                        dangerouslySetInnerHTML={{
                          __html: decode(showNotes.innerHTML),
                        }}
                      />
                    )}
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table> */}
      </main>
    </>
  );
}
