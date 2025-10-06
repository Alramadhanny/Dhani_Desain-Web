const CACHE_NAME = 'abdullah-website-v2';
// Daftar semua file yang perlu di-cache
const urlsToCache = [
  '.',
  'index.html',
  'about.html',
  'contact.html',
  'offline.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  // Daftarkan semua gambar Anda di sini
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
  'foto/icons/icon-192x192.png',
  'foto/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Ambil dari cache jika ada
        }
        return fetch(event.request).catch(() => {
          // Jika fetch gagal (offline), tampilkan halaman offline
          return caches.match('offline.html');
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Hapus cache lama
          }
        })
      );
    })
  );

});
