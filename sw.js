importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

// Detailed logging is very useful during development
// workbox.setConfig({debug: true});

// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// set cache name
workbox.core.setCacheNameDetails({
    prefix: 'purple_mystic',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime',
});

const pre_cache_name = 'purple_mystic-precache-v1';

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installed.');
    self.skipWaiting();
});

self.addEventListener('activate', async (event) => {
    console.log('[Service Worker] Activated.');
    const cacheKeys = await caches.keys();
    cacheKeys.forEach((cacheKey) => {
        if (cacheKey !== pre_cache_name) {
            caches.delete(cacheKey);
        }
    });
    return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    // Fix the following error:
    // Uncaught (in promise) TypeError: Failed to execute 'fetch' on 'WorkerGlobalScope': 'only-if-cached' can be set only with 'same-origin' mode
    if (
        event.request.cache === 'only-if-cached' &&
        event.request.mode !== 'same-origin'
    ) {
        console.log('Fetching operation throws a exception: ', event);
        return;
    }

    if (event.request.method !== 'GET') {
        /* If we don't block the event as shown below, then the request will go to
           the network as usual.
        */
        console.log(
            'WORKER: fetch event ignored.',
            event.request.method,
            event.request.url
        );
        return;
    }

    // if range, to handle partial content, whose status code is 206
    if (event.request.headers.get('range')) {
        const pos = Number(
            /^bytes=(\d+)-$/g.exec(event.request.headers.get('range'))[1]
        );

        console.log(
            'Range request for',
            event.request.url,
            ', starting position:',
            pos
        );

        event.respondWith(
            caches
                .open(pre_cache_name)
                .then((cache) => {
                    return cache.match(event.request.url);
                })
                .then(async (res) => {
                    if (!res) {
                        const res_1 = await fetch(event.request);
                        return res_1.arrayBuffer();
                    }
                    return res.arrayBuffer();
                })
                .then((ab) => {
                    return new Response(ab.slice(pos), {
                        status: 206,
                        statusText: 'Partial Content',
                        headers: [
                            // ['Content-Type', 'video/webm'],
                            [
                                'Content-Range',
                                `bytes ${pos}-${ab.byteLength - 1}/${
                                    ab.byteLength
                                }`,
                            ],
                        ],
                    });
                })
        );
    } else {
        // console.log('Non-range request for', event.request.url);
        event.respondWith(
            // caches.match() will look for a cache entry in all of the caches available to the service worker.
            // It's an alternative to first opening a specific named cache and then matching on that.
            caches.match(event.request).then((response) => {
                // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
                // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
                return (
                    response ||
                    fetch(event.request)
                        .then((response) => {
                            return caches.open(pre_cache_name).then((cache) => {
                                cache.put(event.request, response.clone());
                                return response;
                            });
                        })
                        .catch((error) => {
                            // This catch() will handle exceptions thrown from the fetch() operation.
                            // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
                            // It will return a normal response object that has the appropriate error code set.
                            console.error('Fetching failed:', error);
                            throw error;
                        })
                );
            })
        );
    }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
workbox.precaching.precacheAndRoute([
    {
        url: '404.html',
        revision: '653b6c73a95a0c326c514f38abad1334',
    },
    {
        url: 'app.js',
        revision: 'ca8d3419954c12129d126ae400f23115',
    },
    {
        url: 'baidu_verify_y3hTDLeZxl.html',
        revision: 'aa83a94b4c1e27eb194e02044aa3d089',
    },
    {
        url: 'favicon.png',
        revision: '11e7321c6c0cf31a875993609533c4a6',
    },
    {
        url: 'google8c0ba181a25e1328.html',
        revision: '1d7cd51f112290d906878cbae14cb0d5',
    },
    {
        url: 'index.css',
        revision: '6077ac896abf46ddc7b63e38a313d939',
    },
    {
        url: 'index.html',
        revision: '47b86dd31d739f2feba5ee526434bfef',
    },
    {
        url: 'love/index.html',
        revision: '70f8c4796644f27281feebf0d1873112',
    },
    {
        url: 'love/resource/default.css',
        revision: 'f734197693fe9b2264472e226160a4ed',
    },
    {
        url: 'love/resource/functions.js',
        revision: '0ef9611f34070156005617066f0b46a2',
    },
    {
        url: 'love/resource/jquery.min.js',
        revision: 'db2cccefedcc741a45a582e91a5afe8d',
    },
    {
        url: 'love/resource/jscex-async-powerpack.min.js',
        revision: 'fd45d8a1f07587f6c02374252ec473ff',
    },
    {
        url: 'love/resource/jscex-async.min.js',
        revision: 'aa6f97f754cafa543faaab169e3fd001',
    },
    {
        url: 'love/resource/jscex-builderbase.min.js',
        revision: '9b8461afeb0b66c0d0ad1301b41c243c',
    },
    {
        url: 'love/resource/jscex-jit.js',
        revision: 'c8694188c517a0c89ceb784fbda10e49',
    },
    {
        url: 'love/resource/jscex-parser.js',
        revision: 'a23cd8fa9a8937aed571c01ba52139a6',
    },
    {
        url: 'love/resource/jscex.min.js',
        revision: 'c36e85ee92e83d634d0245bc83889d87',
    },
    {
        url: 'love/resource/love.js',
        revision: '793cbfa6c1cc3d03d1857e9e557986b1',
    },
    {
        url: 'music.png',
        revision: '1f5c5a4e33404a89df10a514db528d13',
    },
]);

workbox.routing.registerRoute(
    // Match common image extensions.
    new RegExp('.+\\.(?:png|gif|jpg|jpeg|ico|svg)'),
    // Use a cache-first strategy with the following config:
    new workbox.strategies.CacheFirst({
        // You need to provide a cache name when using expiration.
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                // Keep at most 50 entries.
                maxEntries: 50,
                // Don't keep any entries for more than 30 days.
                maxAgeSeconds: 30 * 24 * 60 * 60,
                // Automatically cleanup if quota is exceeded.
                purgeOnQuotaError: true,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /.+\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static',
    })
);

workbox.routing.registerRoute(
    /.*\.mp3$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'media',
        plugins: [
            new workbox.cacheableResponse.Plugin({ statuses: [200] }),
            new workbox.rangeRequests.Plugin(),
        ],
    })
);

workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic|baidu)\.com/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'third-party-requests',
    })
);
