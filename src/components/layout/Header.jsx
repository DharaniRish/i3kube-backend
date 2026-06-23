import { useEffect, useEffectEvent, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBarsStaggered, FaChevronDown, FaXmark } from 'react-icons/fa6'
import logo from '../../assets/logo.png'
import { navItems, serviceCategories } from '../../constants/siteData'
import { useAppContext } from '../../context/useAppContext'

function Header() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 18)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { openEnquiryModal } = useAppContext()

  const updateScrolled = useEffectEvent(() => {
    setScrolled(window.scrollY > 18)
  })

  useEffect(() => {
    window.addEventListener('scroll', updateScrolled, { passive: true })

    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20">
      <motion.div
        animate={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.72)',
          boxShadow: scrolled ? '0 18px 50px -32px rgba(11,60,93,0.4)' : '0 12px 32px -28px rgba(11,60,93,0.2)',
        }}
        className="flex h-full w-full items-center justify-between border-b border-white/60 px-4 py-2 backdrop-blur-xl sm:px-6 lg:px-8"
      >
        <Link to="/" className="flex shrink-0 items-center gap-3 sm:ml-4 lg:ml-10 xl:ml-12">
          <img
            src={logo}
            alt="I3CUBE"
            className="h-12 w-12 rounded-[0.85rem] object-contain shadow-lg sm:h-14 sm:w-14 lg:h-16 lg:w-16 lg:rounded-[1rem]"
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-8 lg:flex">
          {navItems.map((item) =>
            item.label === 'Services' ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-950">
                  {item.label}
                  <FaChevronDown className="text-xs" />
                </button>
                <AnimatePresence>
                  {servicesOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 14 }}
                      className="absolute left-1/2 top-full mt-4 w-72 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-2xl border border-white/70 bg-white/97 p-3 shadow-[0_24px_70px_-42px_rgba(11,60,93,0.45)] backdrop-blur-xl"
                    >
                      <div className="grid gap-1">
                        {serviceCategories.map((service) => (
                          <Link
                            key={service.title}
                            to="/services"
                            onClick={() => setServicesOpen(false)}
                            className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? 'text-slate-950' : 'text-slate-700 hover:text-slate-950'}`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/#contact"
            className="inline-flex rounded-[1.25rem] border border-slate-300 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-800 transition hover:border-slate-500 xl:px-5 xl:text-sm xl:tracking-[0.18em]"
          >
            Get in Touch
          </Link>
          <button
            type="button"
            onClick={() => openEnquiryModal('Financial Planning')}
            className="inline-flex rounded-[1.5rem] bg-[var(--color-primary)] px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_18px_42px_-30px_rgba(11,60,93,0.8)] transition hover:bg-[#082d47] xl:px-6 xl:text-sm xl:tracking-[0.2em]"
          >
            Book Appointment
          </button>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-800 lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
        >
          <FaBarsStaggered />
        </button>
      </motion.div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/45 p-4 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl sm:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <p className="text-display text-xl font-bold text-slate-900">Navigate</p>
                <button
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <FaXmark />
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-[1.2rem] border border-slate-100 px-4 py-3.5 text-sm font-semibold text-slate-800"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-6 space-y-3 sm:mt-auto">
                <Link
                  to="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex w-full justify-center rounded-[1.4rem] border border-slate-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-800"
                >
                  Request Callback
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    openEnquiryModal('Financial Planning')
                  }}
                  className="inline-flex w-full justify-center rounded-[1.6rem] bg-[var(--color-primary)] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white"
                >
                  Book Consultation
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Header
