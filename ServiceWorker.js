const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/6bc838080407e54477cecfe87b2cf8db.loader.js",
    "Build/74c7dc4fed2c54592067c07cbcbba055.framework.js",
    "Build/0488258f7e424e385365b7f4e30c0273.data",
    "Build/72f224848377bd316325e848a97d6066.wasm",
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
