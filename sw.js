self.addEventListener('push', function(e) {
  const data = e.data ? e.data.json() : {};
  const title = data.title || 'Thông báo mới';
  const options = {
    body: data.body || 'Bạn có thông báo mới',
    icon: data.icon || '/icon.png',
    badge: data.badge || '/icon.png',
    tag: data.tag || 'notif-' + Date.now(),
    data: { url: data.url || '/' },
    requireInteraction: false,
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url || '/'));
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
