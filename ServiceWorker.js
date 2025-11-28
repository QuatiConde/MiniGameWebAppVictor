const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/bb2d866330040a260b1c06ea392ce65a.loader.js",
    "Build/420b347995dbd5e8b1a91a6c14919f8b.framework.js",
    "Build/934db238844b553698ac77c25104e2aa.data",
    "Build/3c6509b4b1fec631a86e4f21df93e13a.wasm",
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
