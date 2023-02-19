import * as React from 'react';
import { localStorageIsAvailable, setLocalStorage } from '@/utils/utils';
import css from './ColorModeButton.module.scss';

export const ColorModeButton = () => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (!localStorageIsAvailable('bald_syntax_darkmode')) {
      setIsDark(false);
      return;
    }
    const savedMode = JSON.parse(
      window.localStorage.getItem('bald_syntax_darkmode')!
    ) as boolean;
    setIsDark(savedMode);
  }, []);
  React.useEffect(() => {
    setLocalStorage('bald_syntax_darkmode', JSON.stringify(isDark));
    document.body.className = isDark ? 'dark' : '';
  }, [isDark]);
  return (
    <button className={css.btn} onClick={() => setIsDark(!isDark)}>
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 386 388">
        <path
          d="M384 185c-4 6-8 12-14 17a91 91 0 1 1-78-154 14 14 0 0 1 14 21 63 63 0 0 0 9 77c14 14 35 21 55 18a14 14 0 0 1 14 21Z"
          fill="var(--colormode-moon)"
        />
        <path
          d="M194 64a14 14 0 0 0 14-14V14a14 14 0 1 0-28 0v36a14 14 0 0 0 14 14Zm111 222a14 14 0 0 0-19 20l25 25a14 14 0 0 0 20-20l-26-25Zm-111 38a14 14 0 0 0-14 14v36a14 14 0 1 0 28 0v-36a14 14 0 0 0-14-14ZM82 286l-25 25a14 14 0 1 0 20 20l25-25a14 14 0 0 0-20-20Zm-18-92a14 14 0 0 0-14-14H14a14 14 0 0 0 0 28h36a14 14 0 0 0 14-14Zm18-92a14 14 0 0 0 20-20L77 57a14 14 0 0 0-20 20l25 25Zm105 36c0-17 4-34 11-50h-5a106 106 0 1 0 88 166 119 119 0 0 1-94-116Z"
          fill="var(--colormode-sun)"
        />
      </svg>
    </button>
  );
};
