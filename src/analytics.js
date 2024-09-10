import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-5NE66G6EL1');  
  // ReactGA.initialize('G-5NE66G6EL1', { debug: true });
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
