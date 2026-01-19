const CACHE_NAME = 'mrss-dd-coco-v2';
const urlsToCache = [
  '/MRSS_DD_COCO/',
  '/MRSS_DD_COCO/index.html',
  '/MRSS_DD_COCO/manifest.json',
  '/MRSS_DD_COCO/icon-192.png',
  '/MRSS_DD_COCO/icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
