const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/6bc838080407e54477cecfe87b2cf8db.loader.js",
    "Build/d94632cd5f22098d52d5eb7a5ec7a057.framework.js",
    "Build/1bb0168b2739c7c015503f939fdb0a9f.data",
    "Build/e290a1834bccfd7a696e9384f61752bb.wasm",
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
