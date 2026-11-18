import { useSyncExternalStore } from 'react'

function subscribe(callback) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

function NetworkStatus() {
  const online = useSyncExternalStore(subscribe, () => navigator.onLine)

  return (
    <p className={`network-status ${online ? 'network-online' : 'network-offline'}`}>
      {online ? '● Online' : '● Offline — showing cached data'}
    </p>
  )
}

export default NetworkStatus
