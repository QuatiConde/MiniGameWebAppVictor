const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/749006403324c30b20375cb829eb9156.loader.js",
    "Build/420b347995dbd5e8b1a91a6c14919f8b.framework.js",
    "Build/72d47a1fcdeee920ebd6941a5198cde1.data",
    "Build/2a54ecf5174c674d6a3841767d4bcc2c.wasm",
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
