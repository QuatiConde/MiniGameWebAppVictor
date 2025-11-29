const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/42e10cb755a35d284500f46214782c35.loader.js",
    "Build/8b6f194e3285d8d36ee9eb78f70849f4.framework.js",
    "Build/44f40f3764dff4446d30b4059aaf992a.data",
    "Build/b2c29bf768f400186dfdb4944fbd5769.wasm",
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
