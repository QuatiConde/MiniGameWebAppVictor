const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/48d4567ca5d80cb489870f1248c9f984.loader.js",
    "Build/510fbbb40c26faf67227cc8abe963ca4.framework.js",
    "Build/64c30e2ff4ef52476d07fe848b797823.data",
    "Build/84782040f4dff955c9a3750c311a32b1.wasm",
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
