const CACHE_NAME = 'encryptor-app-v3';  // Bump to v3 to clear old cache
const urlsToCache = [
  './',  // Relative paths
  './index.html',
  // Add more if needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching files');  // For debugging
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// ... (The rest of the service-worker.js from my previous response remains the same)
