const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/3c02fe7eeb76017f5c7f7cedbbfaec51.loader.js",
    "Build/510fbbb40c26faf67227cc8abe963ca4.framework.js",
    "Build/352ea894fc6d6fc564657e872a066e24.data",
    "Build/d84f2e3ebedf513d8a1907e4f904bf95.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
