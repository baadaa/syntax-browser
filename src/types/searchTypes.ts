import { FetchDataSet } from './fetchingDataTypes';

export type DictionaryType = {
  number: number;
  hash: string;
  title?: string;
  text?: string;
  pick?: string;
};

export type SearchProps = {
  dictionary: Array<DictionaryType>;
  browseBy: FetchDataSet;
};

export type SearchOptions = 'title' | 'text';
