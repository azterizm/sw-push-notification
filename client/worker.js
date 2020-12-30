console.log('service worker loaded')

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push recieved.')
  self.registration.showNotification(data.title, {
    body: 'Notified by Azterizm',
    icon: 'http://image.ibb.co/frY0Fd/tmlogo.png',
    actions: [
      {
        action: 'open', title: 'Check this out!'
      },
      {
        action: 'close', title: 'Dismiss'
      }
    ]
  })
})

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('http://azterizm-todov2.herokuapp.com/');
    notification.close();
  }
});
