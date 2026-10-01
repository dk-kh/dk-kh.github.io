importScripts(
  'https://www.gstatic.com/firebasejs/12.16.0/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/12.16.0/firebase-messaging-compat.js'
)
firebase.initializeApp({
  apiKey: 'AIzaSyDy3knEMTk4Goy4PwitzlxkK23eJtWlVXU',
  authDomain: 'davdev-3b21c.firebaseapp.com',
  projectId: 'davdev-3b21c',
  storageBucket: 'davdev-3b21c.firebasestorage.app',
  messagingSenderId: '411413851747',
  appId: '1:411413851747:web:f9fa4eec96c5a9af3dd256',
  measurementId: 'G-06JEZ33BB4',
})
const messaging = firebase.messaging()
const appName = new URL(self.location.href).searchParams.get('appName') ?? ''
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title ?? payload.data?.title ?? appName

  const body = payload.notification?.body ?? payload.data?.body ?? ''
  const options = {
    body,
    icon: '/app-icon.png',
    data: payload.data,
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    badge: '/icon-badge.png',
  }
  self.registration
    .showNotification(title, options)
    .then(() => {
      console.log('[FCM SW] Notification shown successfully')
    })
    .catch((err) => {
      console.error('[FCM SW] Failed to show notification:', err)
    })
})
