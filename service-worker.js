const CACHE_NAME = "abdullah-website-v2"; // Menggunakan nama cache Anda
const urlsToCache = [
  '.',
  'index.html',
  'about.html',
  'contact.html',
  'offline.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'foto/logo.png',
  'foto/abg ganteng.jpg',
  'foto/backgroung.jpeg',
  'foto/baskat.jpg',
  'foto/coding.jpeg',
  'foto/hmif.JPG',
  'foto/basket.jpg',
  'foto/anjay.jpg',
  'foto/sg.jpg',
  'foto/smk.jpg',
  'foto/keren.png'
  // Pastikan Anda juga menambahkan semua gambar dari halaman about dan contact di sini
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log("Caching files...");
      for (const url of urlsToCache) {
        try {
          await cache.add(url);
          console.log("Cached:", url);
        } catch (err) {
          console.warn("Failed to cache:", url, err);
        }
      }
    })
  );
});

// Activate Service Worker & hapus cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

const offlinePage = "offline.html";

// Fetch handler
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(offlinePage))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => cachedResponse || fetch(event.request))
    );
  }
});
