const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/6ffa0106efff3cfc2f7ae80ab5987d4f.loader.js",
    "Build/d94632cd5f22098d52d5eb7a5ec7a057.framework.js",
    "Build/b3ee43083333a40b309bfe327c9ca011.data",
    "Build/e709c1ba04c3257fad418fb2f2da5a4b.wasm",
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
