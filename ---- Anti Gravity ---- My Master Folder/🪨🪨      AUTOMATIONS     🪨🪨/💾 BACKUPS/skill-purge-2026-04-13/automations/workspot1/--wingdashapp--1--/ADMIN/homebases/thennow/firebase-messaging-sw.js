importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDzTDqFPliPCvzH3VSJY8l8hXQYbPOYNY8",
  authDomain: "wing-dashboard-144b6.firebaseapp.com",
  projectId: "wing-dashboard-144b6",
  storageBucket: "wing-dashboard-144b6.firebasestorage.app",
  messagingSenderId: "777099944328",
  appId: "1:777099944328:web:b75b68b1a85453f3929a3d"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title || 'Ahead Artist Solutions';
  const notificationOptions = {
    body: payload.notification.body || 'You have an update.',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    data: { url: (payload.data && payload.data.url) ? payload.data.url : '/' }
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url ? event.notification.data.url : '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        if (clientList[i].url === url && 'focus' in clientList[i]) {
          return clientList[i].focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
