export const initGA = () => {
  console.log('Initializing GA');
  
  // Initialize gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}

  // Load the GA4 script dynamically
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=G-5NE66G6EL1`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize GA4
  script.onload = () => {
    gtag('js', new Date());
    gtag('config', 'G-5NE66G6EL1');
  };
};

export const logPageView = () => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  } else {
    console.warn('gtag is not available');
  }
};