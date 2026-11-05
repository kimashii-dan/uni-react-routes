import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))
const ProductsPage = lazy(() => import('./pages/ProductsPage.jsx'))
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage.jsx'))
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'))

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="products">
          <Route index element={<ProductsPage />} />
          <Route path=":id" element={<ProductDetailsPage />} />
        </Route>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
