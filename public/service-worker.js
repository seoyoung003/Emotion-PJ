// public/service-worker.js

// 캐시 이름 설정
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/manifest.json',
];

// 설치 이벤트 처리
this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching Files');
        return cache.addAll(urlsToCache);
      })
  );
});

// 요청 처리 이벤트 (캐시에서 응답하기)
this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // 캐시가 있으면 캐시에서 응답하고, 없으면 네트워크에서 응답
        return cachedResponse || fetch(event.request);
      })
  );
});

// 활성화 이벤트 (구 버전 캐시 삭제)
this.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
