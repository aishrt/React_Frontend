const storagePrefix = 'art_';

const storage = {
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  }, 
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string);
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },

  
  setEmail: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}email`, JSON.stringify(token));
  },
  getEmail: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}email`) as string);
  },
    clearEmail: () => {
    window.localStorage.removeItem(`${storagePrefix}email`);
  },
};

export default storage;
