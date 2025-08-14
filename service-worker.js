const CACHE_NAME = 'encryptor-app-v3';  // Bump to v3 to clear old cache
const urlsToCache = [
  './',  // Relative paths
  './index.html',
  // Add more if you have separate CSS/JS files, e.g., './styles.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching files');  // For debugging
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();  // Force immediate activation
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();  // Take control immediately
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      }).catch(() => {
        return caches.match('./index.html');  // Fallback to cached index
      })
  );
});
