import { motion } from 'framer-motion'
import {
  FaArrowRightLong,
  FaArrowTrendUp,
  FaBriefcase,
  FaBuildingColumns,
  FaCalendarCheck,
  FaChartPie,
  FaCircleCheck,
  FaCoins,
  FaFileInvoiceDollar,
  FaHouseChimney,
  FaShieldHeart,
} from 'react-icons/fa6'
import MagneticButton from '../common/MagneticButton'
import { useAppContext } from '../../context/useAppContext'

const serviceCards = [
  {
    category: 'Investment Planning',
    title: 'Build a disciplined wealth plan.',
    description: 'Goal-led investment strategies with disciplined portfolio reviews.',
    bullets: ['SIP Planning', 'Mutual Funds', 'Portfolio Reviews'],
    icon: FaArrowTrendUp,
    accent: '#D4AF37',
    image:
      'https://images.unsplash.com/photo-1642543348745-03b1219733d9?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Insurance',
    title: 'Protect income and family responsibilities.',
    description: 'Coverage designed around income, family, and continuity risk.',
    bullets: ['Life Insurance', 'Health Coverage', 'Term Insurance'],
    icon: FaShieldHeart,
    accent: '#0F766E',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Financial Planning',
    title: 'Plan today for a better tomorrow.',
    description: 'A structured plan for goals, cash flow, and life events.',
    bullets: ['Goal Planning', 'Cash Flow Planning', 'Risk Management'],
    icon: FaCoins,
    accent: '#D4AF37',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Home & Business Loans',
    title: 'Borrow with clarity and confidence.',
    description: 'Loan guidance shaped around cost, timing, and eligibility.',
    bullets: ['Home Loan', 'Business Loan', 'Loan Against Property'],
    icon: FaHouseChimney,
    accent: '#B45309',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Retirement Planning',
    title: 'Create dependable retirement income.',
    description: 'Retirement strategies focused on income and independence.',
    bullets: ['Pension Planning', 'Corpus Strategy', 'Monthly Income'],
    icon: FaChartPie,
    accent: '#7C3AED',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Tax Saving',
    title: 'Make tax decisions wealth-aware.',
    description: 'Tax-aware decisions that support long-term wealth outcomes.',
    bullets: ['ELSS & 80C', 'Tax Planning', 'Wealth Structuring'],
    icon: FaFileInvoiceDollar,
    accent: '#2563EB',
    image:
      'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Wealth Management',
    title: 'Coordinate assets with purpose.',
    description: 'Asset coordination for growth, protection, and legacy.',
    bullets: ['Asset Allocation', 'Wealth Protection', 'Legacy Planning'],
    icon: FaBuildingColumns,
    accent: '#062B5B',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Business Advisory',
    title: 'Plan better for business growth.',
    description: 'Financial advisory for growth, capital, and continuity.',
    bullets: ['Cash Flow Management', 'Working Capital Solutions', 'Business Structuring'],
    icon: FaBriefcase,
    accent: '#0E7490',
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80',
  },
]

function QuickServicesSection() {
  const { openEnquiryModal } = useAppContext()

  return (
    <section className="bg-[#F8F7F3] py-6 text-[#0F172A] sm:py-7 lg:py-8">
      <div className="mx-auto w-full max-w-[1580px] px-4 sm:px-6 md:px-8 lg:px-[5vw]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="lg:items-start"
        >
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-[#062B5B]/60">
              Service Discovery
            </p>
            <h2 className="text-display mt-2.5 max-w-2xl text-[clamp(1.8rem,2.35vw,2.8rem)] font-bold leading-[1.06] text-slate-950">
              Find the Right Financial Solution for Your Goals<span className="text-[#D4AF37]">.</span>
            </h2>
          </div>
        </motion.div>

        <div className="mt-7">
          <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((service, index) => {
              const Icon = service.icon
              const isFeatured = index === 0

              return (
                <motion.article
                  key={service.category}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl border border-[#062B5B]/18 bg-white p-4 shadow-[0_22px_60px_-42px_rgba(6,43,91,0.72)] transition duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/55 hover:shadow-[0_32px_78px_-38px_rgba(6,43,91,0.42)] sm:min-h-[350px] sm:p-5"
                  style={{ '--service-accent': service.accent }}
                >
                  <div className="relative -mx-1 -mt-1 h-32 overflow-hidden rounded-[1.15rem] bg-[#062B5B] sm:h-40">
                    <img
                      src={service.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,43,91,0.16),rgba(6,43,91,0.68))]" />
                    {isFeatured ? (
                        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#062B5B]/78 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#F8E7A4] shadow-[0_14px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur">
                          <span className="size-1.5 rounded-full bg-[#D4AF37]" />
                          Most Requested Service
                        </span>
                    ) : null}
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div className="inline-flex size-11 items-center justify-center rounded-xl bg-[#D4AF37]/14 text-lg text-[#062B5B] ring-1 ring-[#D4AF37]/18 transition duration-300 group-hover:bg-[#062B5B] group-hover:text-[#D4AF37]">
                      <Icon aria-hidden="true" />
                    </div>
                    <span className="text-sm font-bold text-[#D4AF37]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#062B5B]/70">
                    {service.category}
                  </p>

                  <h3 className="text-display mt-2 line-clamp-2 text-[1.35rem] font-bold leading-[1.12] text-[#062B5B] sm:text-[1.55rem]">
                    {service.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>

                  <div className="mt-4 grid gap-2">
                    {service.bullets.slice(0, 3).map((bullet) => (
                      <div key={bullet} className="flex items-center gap-2.5 text-xs font-semibold leading-5 text-slate-600">
                        <FaCircleCheck className="shrink-0 text-[0.7rem] text-[#D4AF37]" aria-hidden="true" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-5">
                    <button
                      type="button"
                      onClick={() => openEnquiryModal(service.category)}
                      className="group/link inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-xl bg-[#062B5B] px-4 text-sm font-bold text-white shadow-[0_18px_44px_-28px_rgba(6,43,91,0.8)] transition duration-300 hover:bg-[#031D3F]"
                    >
                      Explore Service
                      <FaArrowRightLong
                        className="text-[#D4AF37] transition duration-300 group-hover/link:translate-x-2"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="mt-4 rounded-2xl border border-[#003366]/10 bg-white/92 p-3.5 shadow-[0_20px_58px_-48px_rgba(0,51,102,.52)] backdrop-blur sm:p-4"
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-4">
              <div className="hidden rounded-xl bg-[#003366]/8 p-3 text-xl text-[#003366] sm:inline-flex">
                <FaCalendarCheck aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-display text-lg font-semibold text-slate-950 sm:text-xl">
                  Still not sure which service fits your needs?
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  Book a FREE 30-minute consultation with our financial experts.
                </p>
              </div>
            </div>
            <MagneticButton
              onClick={() => openEnquiryModal('Free 30-minute Consultation')}
              containerClassName="w-full sm:w-auto"
              className="min-h-9 w-full !px-4 !py-2 text-[0.65rem] tracking-[0.14em] sm:w-auto sm:text-xs"
            >
              <span className="inline-flex items-center gap-2">
                <FaCalendarCheck aria-hidden="true" />
                Book Free Consultation
                <FaArrowRightLong aria-hidden="true" />
              </span>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default QuickServicesSection
