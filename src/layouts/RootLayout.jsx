import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import Message from '../components/Message.jsx'
import NetworkStatus from '../components/NetworkStatus.jsx'
import UpdatePrompt from '../components/UpdatePrompt.jsx'

function RootLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <NavBar />
      <main className="container">
        <NetworkStatus />
        <UpdatePrompt />
        <Suspense fallback={<Message type="loading">Loading page...</Message>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}

export default RootLayout
