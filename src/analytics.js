import { devLog, devWarn } from './utils/logging';

let isInitialized = false;
let isInitializing = false;
let initCallbacks = [];

export const initGA = (callback) => {
  if (isInitialized) {
    devLog('GA already initialized');
    if (callback) callback();
    return;
  }

  if (isInitializing) {
    devLog('GA initialization in progress, queuing callback');
    if (callback) initCallbacks.push(callback);
    return;
  }

  isInitializing = true;
  if (callback) initCallbacks.push(callback);
  devLog('Initializing GA');
  
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  // Check if the script is already loaded
  if (document.querySelector('script[src^="https://www.googletagmanager.com/gtag/js"]')) {
    devLog('GA script already loaded, initializing');
    initializeGA();
    return;
  }

  // Load the GA4 script dynamically
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=G-5NE66G6EL1`;
  script.async = true;
  script.onload = initializeGA;
  document.head.appendChild(script);
};

function initializeGA() {
  window.gtag = function(){window.dataLayer.push(arguments);}
  window.gtag('js', new Date());
  window.gtag('config', 'G-5NE66G6EL1');
  isInitialized = true;
  isInitializing = false;
  devLog('GA initialization complete');
  initCallbacks.forEach(cb => cb());
  initCallbacks = [];
}

export const logPageView = () => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
    devLog('Page view logged');
  } else {
    devWarn('gtag is not available, page view not logged');
  }
};