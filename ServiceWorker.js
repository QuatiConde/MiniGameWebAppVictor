const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/340603054bfe50d205948d123ba28627.loader.js",
    "Build/5ef73e9489d557ee079b24a5644f84c3.framework.js",
    "Build/0d8e9833e90ccd7414961a6b16a9d489.data",
    "Build/96a34562188b71b6a633d732cea7e6ff.wasm",
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
