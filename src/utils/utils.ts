import { ShowType, ShowsByYear } from '@/types/showTypes';

export const setLocalStorage = (key = '', data = ''): void => {
  window.localStorage.setItem(key, data);
};

export const localStorageIsAvailable = (data: string): boolean =>
  !!window.localStorage.getItem(data);

export const standardizeData = (showList: Array<ShowType>) => {
  return showList.reduce((obj, show) => {
    const year = new Date(show.date).getFullYear();
    const showWithCategory = addCategory(show);
    (obj[year] = obj[year] || []).push(showWithCategory);
    return obj;
  }, {} as ShowsByYear);
};

export const fetchShows = async () => {
  const response = await fetch('https://syntax.fm/api/shows');
  const shows = await response.json();
  return shows;
};

export const addCategory = (show: ShowType) => {
  const title = show.title.toLowerCase();
  const textDump = show.html.toLocaleLowerCase();
  const findMatch = (keyword: string) => {
    return title.startsWith(keyword) || textDump.indexOf(keyword) !== -1;
  };
  const isSupperClub = findMatch('supper club');
  const isPotluck = findMatch('potluck');
  const isHasty = findMatch('hasty treat');

  if (isSupperClub) return { ...show, category: 'supper' };
  if (isPotluck) return { ...show, category: 'potluck' };
  if (isHasty) return { ...show, category: 'hasty' };
  return { ...show, category: 'regular' };
};
