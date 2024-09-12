const isDev = process.env.NODE_ENV === 'development';

export const devLog = (message) => {
  if (isDev) {
    console.log(message);
  }
};

export const devWarn = (message) => {
  if (isDev) {
    console.warn(message);
  }
};
