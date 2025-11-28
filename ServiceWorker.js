const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/24a01a2635c33f2fd73b249620f2aa26.loader.js",
    "Build/510fbbb40c26faf67227cc8abe963ca4.framework.js",
    "Build/50d45f2dd241633b33579e1d7aa2bb81.data",
    "Build/de1a17aadbab8302a4e5a18a749e8881.wasm",
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
