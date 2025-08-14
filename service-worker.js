const CACHE_NAME = 'encryptor-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Add any other assets if needed (e.g., '/styles.css' if you extract CSS)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
