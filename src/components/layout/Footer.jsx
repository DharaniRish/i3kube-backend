import { Link } from 'react-router-dom'
import {
  navItems,
  officeDetails,
  serviceCategories,
  socialLinks,
} from '../../constants/siteData'
import logo from '../../assets/logo.png'

function Footer() {
  return (
    <footer className="mt-12 w-full bg-[linear-gradient(180deg,#0B1F33,#081624)] text-white">
      <div className="section-shell py-10 sm:py-12">
        <div className="grid gap-10 md:grid-cols-[1.25fr_0.8fr_0.8fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="I3CUBE"
                className="h-12 w-12 rounded-2xl object-contain"
              />
              <div>
                <p className="text-display text-xl font-bold text-white">I3CUBE</p>
                <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                  Invest • Insure • Income
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/68">
              Premium financial guidance spanning investments, insurance, and wealth strategy for every major life milestone.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-white/72 transition hover:border-white/25 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-display text-lg font-semibold text-white">Quick Links</p>
            <div className="mt-5 space-y-3">
              {navItems.map((item) => (
                <Link key={item.label} to={item.to} className="block text-sm text-white/68 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-display text-lg font-semibold text-white">Services</p>
            <div className="mt-5 space-y-3">
              {serviceCategories.map((service) => (
                <Link
                  key={service.title}
                  to={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block text-sm text-white/68 transition hover:text-white"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 text-sm text-white/45 md:grid-cols-2 md:items-center">
          <div>
            <p>{officeDetails.address}</p>
            <p className="mt-1">
              {officeDetails.phone} · {officeDetails.email}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <Link
              to="/admin/login"
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/72 transition hover:border-[var(--color-accent)] hover:text-white"
            >
              Admin Login
            </Link>
            <span>Privacy Policy</span>
            <span>Terms</span>
            <span>Disclaimer</span>
            <span>© {new Date().getFullYear()} I3CUBE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
