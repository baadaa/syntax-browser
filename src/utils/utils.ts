export const setLocalStorage = (key = '', data = ''): void => {
  window.localStorage.setItem(key, data);
};

export const localStorageIsAvailable = (data: string): boolean =>
  !!window.localStorage.getItem(data);
