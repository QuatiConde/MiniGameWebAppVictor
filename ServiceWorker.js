const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/340603054bfe50d205948d123ba28627.loader.js",
    "Build/510fbbb40c26faf67227cc8abe963ca4.framework.js",
    "Build/93d57152deab5e1078a435f00279ee6d.data",
    "Build/037148e4f66b79ccd264dce5f0ce97c8.wasm",
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
