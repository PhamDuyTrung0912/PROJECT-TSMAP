// eslint-disable-next-line
import { precacheAndRoute } from 'workbox-precaching';
// eslint-disable-next-line
import { registerRoute } from 'workbox-routing';
// eslint-disable-next-line
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
// eslint-disable-next-line
import { setCacheNameDetails } from 'workbox-core';

setCacheNameDetails({
    prefix: 'd2d3',
    precache: 'precache',
    suffix: String(new Date().getTime()),
});
// eslint-disable-next-line
precacheAndRoute(self.__WB_MANIFEST);

// eslint-disable-next-line
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            const precaches = cacheNames.filter((cacheName) => (cacheName.includes('d2d3') && cacheName.includes('precache')));
            let lastPrecache = null;
            let lastPrecacheTimestamp = null;
            for (const precache of precaches) {
                let precacheTimestamp = precache.split('-');
                if (precacheTimestamp && precacheTimestamp.length >= 3 && precacheTimestamp[2] > 1000) {
                    precacheTimestamp = precacheTimestamp[2];
                    if (!lastPrecache || parseInt(precacheTimestamp) > lastPrecacheTimestamp) {
                        lastPrecacheTimestamp = parseInt(precacheTimestamp);
                        lastPrecache = precache;
                    }
                }
            }
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (
                        !cacheName.includes('google-fonts')
            && !cacheName.includes('osm')
            && !cacheName.includes('symbols')
            && !cacheName.includes('attachments')
            && !cacheName.includes(lastPrecache)
                    ) {
                        return caches.delete(cacheName);
                    } return null;
                }),
            );
        }),
    );
});

// eslint-disable-next-line
skipWaiting();

registerRoute(
    /.*(?:fonts\.googleapis|fonts\.gstatic)\.com.*$/,
    new StaleWhileRevalidate({
        cacheName: 'google-fonts',
    }),
);

registerRoute(
    /.*(?:a.tile.openstreetmap.org\/).*$/,
    new CacheFirst({
        cacheName: 'osm',
    }),
);

registerRoute(
    /.*(?:com\/symbols).*$/,
    new CacheFirst({
        cacheName: 'symbols',
    }),
);

registerRoute(
    /.*(?:\/attachments).*$/,
    new CacheFirst({
        cacheName: 'attachments',
    }),
);
