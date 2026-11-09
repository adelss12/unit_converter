/* Service Worker لمحفظة الملفات وتوفير ميزة العمل بدون إنترنت (Offline PWA) */
const CACHE_NAME = 'unit-converter-v1.1.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// مرحلة التثبيت وتخزين الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// مرحلة التفعيل وحذف الملفات القديمة من الكاش
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key.startsWith('unit-converter-') && key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// مرحلة الاستجابة للطلبات مع دعم Cache-First مع التحديث في الخلفية
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // في حال انقطاع الشبكة يتم إرجاع الصفحة الرئيسية إذا كان الطلب ملاحة
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
