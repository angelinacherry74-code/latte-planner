// Назва сховища для кешу
const CACHE_NAME = 'cozy-notebook-v1';
// Файли, які додаток збереже в пам'ять телефону, щоб працювати без інтернету
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icon.png'
];

// Встановлення сервіс-воркера та кешування
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Активація
self.addEventListener('activate', (e) => {
  console.log('Service Worker активовано ✨');
});

// Обробка запитів (дозволяє блокноту працювати офлайн)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});