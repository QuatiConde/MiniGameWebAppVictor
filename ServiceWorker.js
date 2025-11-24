const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/f6a881a0e80cb02d40c8b23c84272ec3.loader.js",
    "Build/61100263d9916275ebf3d1908c158bb5.framework.js",
    "Build/9710ac7ca42e99906ddcc2d4a488c637.data",
    "Build/5ef08b5ae7a0e91e95c4a791bf054546.wasm",
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
