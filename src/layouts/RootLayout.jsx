import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import Message from '../components/Message.jsx'

function RootLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <NavBar />
      <main className="container">
        <Suspense fallback={<Message type="loading">Loading page...</Message>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}

export default RootLayout
