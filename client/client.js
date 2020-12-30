const publicVapidKey =
  'BLBhSQ6P2koy8NhplCWpol0sgxuuB2Ai7N3BPtvBv9ZSJEZym4HzhS17_6rJYgQSjdEkWMSQbvrXgIICbJJwx0Y'

// Register SW, Register Push, Send Push
send = async () => {
  console.log('Registering server worker...')

  if (Notification.permission !== 'granted') {
    Notification.requestPermission()
    return
  }

  const register =
    await navigator.serviceWorker.register('./worker.js', {
      scope: '/'
    })

  console.log('Server Worker registered.')
  console.log('Registering Push...')

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  })

  console.log('Push registered.')
  console.log('Sending Push..')

  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  })

  console.log('Push sent.')
}


if ('serviceWorker' in navigator) {
  send().catch(err => console.error(err))
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
