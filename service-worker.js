const CACHE_NAME = 'gcm-visa-cache-v1';
const URLs_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
];

// Install Service Worker and Cache Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLs_TO_CACHE);
    })
  );
});

// Fetch from Cache or Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Return cached response
      }
      return fetch(event.request); // Fallback to network if not in cache
    })
  );
});

// Activate the service worker and clear old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});
