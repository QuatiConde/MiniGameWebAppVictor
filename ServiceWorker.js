const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/4acc4f05ab50a08f3f12faed24d259b1.loader.js",
    "Build/74c7dc4fed2c54592067c07cbcbba055.framework.js",
    "Build/ac71be153edcb2113f591177fdf173b8.data",
    "Build/a5e7192246ef0cb9ceaf60ee83ac828d.wasm",
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
