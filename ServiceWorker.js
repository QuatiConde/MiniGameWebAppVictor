const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/034c16847400809a51c82ea76604f8ef.loader.js",
    "Build/61100263d9916275ebf3d1908c158bb5.framework.js",
    "Build/124cd3a4aad29467931ac27a936762b9.data",
    "Build/ffb90e3ce3b984fa668aff17e1ef93bb.wasm",
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
