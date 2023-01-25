export const setLocalStorage = (key = '', data = ''): void => {
  window.localStorage.setItem(key, data);
};

export const localStorageIsAvailable = (data: string): boolean =>
  !!window.localStorage.getItem(data);

type ShowType = {
  date: number;
  displayDate: string;
  displayNumber: string;
  html: string;
  notesFile: string;
  number: number;
  slug: string;
  title: string;
  url: string;
};
type ShowsByYear = {
  [key: number]: Array<ShowType>;
};
export const groupByYear = (showList: Array<ShowType>) => {
  return showList.reduce((obj, show) => {
    const year = new Date(show.date).getFullYear();
    (obj[year] = obj[year] || []).push(show);
    return obj;
  }, {} as ShowsByYear);
};
