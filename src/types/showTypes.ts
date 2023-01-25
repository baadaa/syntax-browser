export type ShowType = {
  date: number;
  displayDate: string;
  displayNumber: string;
  html: string;
  notesFile: string;
  number: number;
  slug: string;
  title: string;
  url: string;
  category?: string;
};
export type ShowsByYear = {
  [key: number]: Array<ShowType>;
};
