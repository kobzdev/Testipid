// TipidCart Service Worker v3.0 — Full Offline Support
const CACHE_NAME = 'tipidcart-v3';
const APP_SHELL = [
  'https://tipidcartbudget.vercel.app/index.html',
  'https://tipidcartbudget.vercel.app/manifest.json',
];

// External resources to cache
const EXTERNAL_CACHE = [
  // Chart.js
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap',
];

// Tesseract OCR files — large, cached separately for offline camera use
const TESS_CACHE_NAME = 'tipidcart-tess-v3';
const TESS_FILES = [
  'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',
  'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js',
  'https://cdn.jsdelivr.net/npm/tesseract.js-core@5/tesseract-core-simd-lstm.wasm.js',
  'https://cdn.jsdelivr.net/npm/tesseract.js-core@5/tesseract-core-lstm.wasm.js',
  // English language data (~4MB) — the key file for text recognition
  'https://tessdata.projectnaptha.com/4.0.0/eng.traineddata.gz',
];

// ── INSTALL ──────────────────────────────────────────────
self.addEventListener('install', function(event) {
  console.log('[SW v3] Installing…');
  event.waitUntil(
    Promise.all([
      // 1. Cache app shell (critical — always works)
      caches.open(CACHE_NAME).then(function(cache) {
        return Promise.allSettled(
          [...APP_SHELL, ...EXTERNAL_CACHE].map(function(url) {
            return cache.add(url).catch(function(e) {
              console.warn('[SW] Could not cache:', url, e.message);
            });
          })
        );
      }),
      // 2. Pre-cache Tesseract files (best-effort, non-blocking)
      caches.open(TESS_CACHE_NAME).then(function(cache) {
        return Promise.allSettled(
          TESS_FILES.map(function(url) {
            return cache.add(url).catch(function(e) {
              console.warn('[SW] Tess cache failed:', url, e.message);
            });
          })
        );
      })
    ]).then(function() {
      console.log('[SW v3] Install complete');
      return self.skipWaiting();
    })
  );
});

// ── ACTIVATE ─────────────────────────────────────────────
self.addEventListener('activate', function(event) {
  console.log('[SW v3] Activating…');
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) {
          return k !== CACHE_NAME && k !== TESS_CACHE_NAME;
        }).map(function(k) {
          console.log('[SW] Deleting old cache:', k);
          return caches.delete(k);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// ── FETCH ─────────────────────────────────────────────────
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension://')) return;
  if (event.request.url.startsWith('blob:')) return;

  var url = event.request.url;
  var isTess = TESS_FILES.some(function(t) { return url.includes(t) || url === t; }) ||
               url.includes('tesseract') ||
               url.includes('tessdata');

  event.respondWith(
    // Check both caches
    caches.match(event.request, { ignoreSearch: false }).then(function(cached) {
      if (cached) {
        // Serve from cache immediately
        // Background refresh for app shell only (not large tess files)
        if (!isTess && navigator.onLine) {
          fetch(event.request).then(function(fresh) {
            if (fresh && fresh.status === 200) {
              var cacheName = isTess ? TESS_CACHE_NAME : CACHE_NAME;
              caches.open(cacheName).then(function(c) { c.put(event.request, fresh); });
            }
          }).catch(function() {});
        }
        return cached;
      }

      // Not cached — fetch from network and cache it
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200) return response;

        var cacheName = isTess ? TESS_CACHE_NAME : CACHE_NAME;
        var toCache = response.clone();
        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, toCache);
        });
        return response;

      }).catch(function() {
        // Network failed — check caches one more time
        return caches.match(event.request).then(function(r) {
          if (r) return r;
          // Fallback to app index for navigation
          if (event.request.mode === 'navigate') {
            return caches.match('https://tipidcartbudget.vercel.app/index.html');
          }
        });
      });
    })
  );
});

// ── MESSAGE: manual cache of Tesseract from page ─────────
// Page can send { type: 'CACHE_TESS' } to trigger caching
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'CACHE_TESS') {
    caches.open(TESS_CACHE_NAME).then(function(cache) {
      Promise.allSettled(
        TESS_FILES.map(function(url) {
          return cache.add(url).catch(function(e) {
            console.warn('[SW] Manual tess cache failed:', url);
          });
        })
      ).then(function() {
        event.source && event.source.postMessage({ type: 'TESS_CACHED' });
        console.log('[SW] Tesseract files cached on demand');
      });
    });
  }
});
