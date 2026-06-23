import { Link } from 'react-router-dom'
import Seo from '../components/seo/Seo'

function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" path="/404" />
      <section className="section-shell flex min-h-screen items-center justify-center py-28">
        <div className="glass-card max-w-2xl p-10 text-center">
          <span className="label-chip">404</span>
          <h1 className="text-display mt-6 text-5xl font-bold text-slate-900">
            This page wandered off the financial plan.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            The route you tried doesn’t exist. Let’s get you back to the main experience.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white"
          >
            Return Home
          </Link>
        </div>
      </section>
    </>
  )
}

export default NotFoundPage
