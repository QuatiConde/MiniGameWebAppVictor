const cacheName = "AruanaEstudio-MiniGames-1.0";
const contentToCache = [
    "Build/74325571c7ec97911228006361b75b58.loader.js",
    "Build/754e36a73a5827ee6b136a4e0e0bce17.framework.js",
    "Build/a5a0e813e0f63ae99ff2db3c8313e4b4.data",
    "Build/5ed8bf4addaa0647edc44371be5b06ca.wasm",
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
