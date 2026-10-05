/* Service worker — cache-first pour une consultation 100% hors-ligne le jour de l'examen. */
var CACHE = 'brevet-v1';
var ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // addAll échoue en bloc si une seule ressource manque : on tolère les absences.
      return Promise.all(ASSETS.map(function (u) {
        return c.add(new Request(u, { cache: 'reload' })).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  // Les polices Google : cache-first, mise en cache opportuniste.
  var isFont = /fonts\.(googleapis|gstatic)\.com/.test(req.url);

  e.respondWith(
    caches.match(req, { ignoreSearch: !isFont }).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy).catch(function () {}); });
        }
        return res;
      }).catch(function () {
        // Hors-ligne et rien en cache : on retombe sur la page principale pour une navigation.
        if (req.mode === 'navigate') return caches.match('./index.html');
        return new Response('', { status: 504, statusText: 'Hors-ligne' });
      });
    })
  );
});
