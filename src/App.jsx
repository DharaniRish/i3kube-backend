import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute'

const HomePage = lazy(() => import('./pages/HomePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const PartnersPage = lazy(() => import('./pages/PartnersPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'))
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="section-shell flex min-h-[60vh] items-center justify-center">
      <div className="glass-card w-full max-w-xl p-10 text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-[var(--color-primary)]" />
        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-slate-500">
          Preparing Experience
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<Navigate to="/#about" replace />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="partners" element={<PartnersPage />} />
          <Route path="calculators" element={<Navigate to="/#financial-calculators" replace />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contact" element={<Navigate to="/#contact" replace />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
        </Route>

        <Route
          path="admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />

        <Route path="admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
