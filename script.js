const reveals = document.querySelectorAll('.reveal');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const cookieBanner = document.querySelector('#cookie-banner');
const acceptCookiesButton = document.querySelector('#accept-cookies');
const rejectCookiesButton = document.querySelector('#reject-cookies');

const initializeAds = () => {
  document.querySelectorAll('.adsbygoogle').forEach((ad) => {
    if (ad.dataset.loaded === 'true') {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      ad.dataset.loaded = 'true';
    } catch (error) {
      console.warn('AdSense no disponible todavía', error);
    }
  });
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  }
);

reveals.forEach((element) => revealObserver.observe(element));

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (cookieBanner) {
  const savedConsent = window.localStorage.getItem('cookie-consent');

  if (savedConsent === 'accepted') {
    initializeAds();
  } else if (!savedConsent) {
    cookieBanner.hidden = false;
  }
}

if (acceptCookiesButton) {
  acceptCookiesButton.addEventListener('click', () => {
    window.localStorage.setItem('cookie-consent', 'accepted');
    if (cookieBanner) {
      cookieBanner.hidden = true;
    }
    initializeAds();
  });
}

if (rejectCookiesButton) {
  rejectCookiesButton.addEventListener('click', () => {
    window.localStorage.setItem('cookie-consent', 'rejected');
    if (cookieBanner) {
      cookieBanner.hidden = true;
    }
  });
}
