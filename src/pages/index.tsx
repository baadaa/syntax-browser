import { useState, useEffect } from 'react';
import { parse } from 'node-html-parser';
import Head from 'next/head';
import Image from 'next/image';
import { Work_Sans } from '@next/font/google';
import { localStorageIsAvailable, setLocalStorage } from '@/utils/utils';

const ws = Work_Sans({ weight: ['300', '400', '700'], subsets: ['latin'] });

export default function Home() {
  const [shows, setShows] = useState([]);
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
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Syntax Podcast browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={ws.className}>
        <table style={{ maxWidth: '1200px', fontWeight: 300 }}>
          <tbody>
            {shows.map((show, i) => {
              const { number, title, displayDate, slug, html } = show;
              const parsedHTML = parse(html);
              const intro = parsedHTML.querySelector('p:first-of-type');
              const showNotes = parsedHTML.querySelector(
                'h2#show-notes + p, h2#show-notes + ul'
              );
              console.log(showNotes);
              return (
                <tr key={i}>
                  <td>{number}</td>
                  <td>{displayDate}</td>
                  <td>
                    <a href={`https://syntax.fm/${slug}`}> {title} </a>
                  </td>
                  <td>{intro?.innerText}</td>
                  <td>{showNotes?.innerText}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}
