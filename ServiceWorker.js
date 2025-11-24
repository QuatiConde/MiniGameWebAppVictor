const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/50fe56193d243dfcea4e4148f8eb5357.loader.js",
    "Build/5fa4674293210e1991f761a8e58fb268.framework.js",
    "Build/2394ac13ceb26814d47c0fa059088ad3.data",
    "Build/2a3ba7e5ca042bd626e989aacaa979ef.wasm",
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
