importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉Service Worker is working!`);
} else {
  console.log(`Boo! Workbox didn't load 😬Service Worker won't work properly...`);
}

const { registerRoute } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
const { precacheAndRoute, matchPrecache } = workbox.precaching;

precacheAndRoute([{"revision":"51b1c635de81aaf49c1b674eb91971fa","url":"favicon.ico"},{"revision":"0cbba3f8b57d74425e355bba0b804327","url":"index.html"},{"revision":"b5c865126953a407bb214fc9114b9d88","url":"tiddlywiki5.js"},{"revision":"713f708b9b2662da54cd38bc98a6483f","url":"TiddlyWikiIconBlack.png"},{"revision":"2c94295d5e6cfa9e5f0b666c4ba1964c","url":"TiddlyWikiIconWhite.png"},{"revision":"a9c3231dc859bbccdd8c14950efcb030","url":"vercel.json"}]);

registerRoute(
  /\.css$/,
  // Use cache but update in the background.
  new StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-cache',
  })
);

registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|woff2?|ttf)$/,
  // Use the cache if it's available.
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        // Cache only a few images.
        maxEntries: 100,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(/\.js$/, new StaleWhileRevalidate());
registerRoute(/(^\/$|index.html)/, new StaleWhileRevalidate());

self.addEventListener('install', (e) => {
  self.skipWaiting();
});
