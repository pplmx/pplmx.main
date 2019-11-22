/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// Detailed logging is very useful during development
workbox.setConfig({debug: true});

// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// set cache name
workbox.core.setCacheNameDetails({
    prefix: 'purple_mystic',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime'
});

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installed", event);
    self.skipWaiting();
});

self.addEventListener("activate", async (event) => {
    console.log("[Service Worker] Activated", event);
    const cacheKeys = await caches.keys();
    cacheKeys.forEach(cacheKey => {
        console.log("cache key: ", cacheKey)
        if (cacheKey !== getCacheName()) {
            caches.delete(cacheKey);
        }
    });
    return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    console.log("[Service Worker] Fetched resource ", event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
workbox.precaching.precacheAndRoute([
  {
    "url": "404.html",
    "revision": "653b6c73a95a0c326c514f38abad1334"
  },
  {
    "url": "baidu_verify_y3hTDLeZxl.html",
    "revision": "aa83a94b4c1e27eb194e02044aa3d089"
  },
  {
    "url": "favicon.png",
    "revision": "11e7321c6c0cf31a875993609533c4a6"
  },
  {
    "url": "google8c0ba181a25e1328.html",
    "revision": "1d7cd51f112290d906878cbae14cb0d5"
  },
  {
    "url": "index.css",
    "revision": "d9fccc7fed9294c29d5e6af474182cf4"
  },
  {
    "url": "index.html",
    "revision": "f676e1733bf1fc96b65d34a32020987b"
  },
  {
    "url": "love/ANOHANA.mp3",
    "revision": "c40149ee1c98c6ed289144b0a61f9a2c"
  },
  {
    "url": "love/index.html",
    "revision": "70f8c4796644f27281feebf0d1873112"
  },
  {
    "url": "love/resource/default.css",
    "revision": "f734197693fe9b2264472e226160a4ed"
  },
  {
    "url": "love/resource/functions.js",
    "revision": "0ef9611f34070156005617066f0b46a2"
  },
  {
    "url": "love/resource/jquery.min.js",
    "revision": "db2cccefedcc741a45a582e91a5afe8d"
  },
  {
    "url": "love/resource/jscex-async-powerpack.min.js",
    "revision": "fd45d8a1f07587f6c02374252ec473ff"
  },
  {
    "url": "love/resource/jscex-async.min.js",
    "revision": "aa6f97f754cafa543faaab169e3fd001"
  },
  {
    "url": "love/resource/jscex-builderbase.min.js",
    "revision": "9b8461afeb0b66c0d0ad1301b41c243c"
  },
  {
    "url": "love/resource/jscex-jit.js",
    "revision": "c8694188c517a0c89ceb784fbda10e49"
  },
  {
    "url": "love/resource/jscex-parser.js",
    "revision": "a23cd8fa9a8937aed571c01ba52139a6"
  },
  {
    "url": "love/resource/jscex.min.js",
    "revision": "c36e85ee92e83d634d0245bc83889d87"
  },
  {
    "url": "love/resource/love.js",
    "revision": "793cbfa6c1cc3d03d1857e9e557986b1"
  },
  {
    "url": "music.png",
    "revision": "1f5c5a4e33404a89df10a514db528d13"
  },
  {
    "url": "qin_moon/beautiful.mp3",
    "revision": "f81afbc153605c0ac0401e880dc7cfbc"
  },
  {
    "url": "qin_moon/chaos.mp3",
    "revision": "877029ae5f2712d8a71a68c0a2e2c384"
  },
  {
    "url": "qin_moon/dominate.mp3",
    "revision": "bed5e816a7505159f0db826918d88ed8"
  },
  {
    "url": "qin_moon/hall.mp3",
    "revision": "be9b9f2b188ef84a0de7af03b1d89623"
  },
  {
    "url": "qin_moon/invincible.mp3",
    "revision": "931ec553321dc550b3b3b118df03e171"
  },
  {
    "url": "qin_moon/snow_flower.mp3",
    "revision": "5565d0bc7bef3f1746c9635f2be1d7c9"
  },
  {
    "url": "qin_moon/universe.mp3",
    "revision": "09210380ac8e72dbb3e13068ccc9d464"
  }
]);

workbox.routing.registerRoute(
    // Match common image extensions.
    new RegExp(".+\\.(?:png|gif|jpg|jpeg|ico|svg)"),
    // Use a cache-first strategy with the following config:
    new workbox.strategies.CacheFirst({
        // You need to provide a cache name when using expiration.
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                // Keep at most 50 entries.
                maxEntries: 50,
                // Don't keep any entries for more than 30 days.
                maxAgeSeconds: 30 * 24 * 60 * 60,
                // Automatically cleanup if quota is exceeded.
                purgeOnQuotaError: true,
            })
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp(".+\\.html"),
    new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
    new RegExp(".+\\.(?:js|css)$"),
    new workbox.strategies.CacheFirst()
);