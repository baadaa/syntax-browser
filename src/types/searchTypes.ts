export type DictionaryType = {
  number: number;
  hash: string;
  title: string;
  text: string;
};

export type SearchProps = {
  dictionary: Array<DictionaryType>;
};
