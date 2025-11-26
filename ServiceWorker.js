const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/bd4c35068b57612e0aeffe0a81835ae2.loader.js",
    "Build/420b347995dbd5e8b1a91a6c14919f8b.framework.js",
    "Build/ed8dc3aaa95a812d65e1050c36f6d80c.data",
    "Build/81f7fb3ceab07a6bca3a9da7deb39134.wasm",
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
