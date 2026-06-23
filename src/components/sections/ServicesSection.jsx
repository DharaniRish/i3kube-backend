import { motion } from 'framer-motion'
import { FaArrowRightLong, FaCircleCheck } from 'react-icons/fa6'
import SectionIntro from '../common/SectionIntro'
import MagneticButton from '../common/MagneticButton'
import { serviceCategories } from '../../constants/siteData'
import { useAppContext } from '../../context/useAppContext'

function ServicesSection({
  eyebrow = 'Our Services',
  title = 'Integrated financial solutions built for life, family, and business goals.',
  description = 'Each practice area is designed to feel consultative rather than transactional, with clear advice and structured next steps.',
}) {
  const { openEnquiryModal } = useAppContext()

  return (
    <section className="section-shell section-space">
      <SectionIntro eyebrow={eyebrow} title={title} description={description} />

      <div className="mt-10 space-y-6 sm:mt-14 sm:space-y-8">
        {serviceCategories.map((service, index) => {
          const Icon = service.icon
          const reverse = index % 2 === 1

          return (
            <motion.article
              key={service.title}
              id={service.title.toLowerCase().replace(/\s+/g, '-')}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="scroll-mt-24 overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[var(--shadow-card)] sm:rounded-[2.2rem]"
            >
              <div className={`grid items-stretch lg:grid-cols-[1.05fr_0.95fr] ${reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>
                <div className="photo-overlay relative min-h-[220px] overflow-hidden sm:min-h-[280px] lg:min-h-[340px]">
                  <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.accent} opacity-35`} />
                </div>

                <div className="relative flex flex-col justify-between p-5 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-[1.35rem] bg-[rgba(0,51,102,0.06)] p-4 text-3xl text-[var(--color-primary)]">
                    <Icon />
                  </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        Service {String(index + 1).padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-display text-[clamp(1.75rem,7vw,2.2rem)] font-semibold leading-tight text-slate-900">
                    {service.title}
                  </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                    {service.description}
                  </p>
                    <div className="mt-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                      Included Services
                    </p>
                  </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {service.highlights.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                      >
                        <span className="text-[var(--color-secondary)]">
                          <FaCircleCheck />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  </div>
                  <button
                    className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)] sm:mt-8 sm:tracking-[0.22em]"
                    onClick={() => openEnquiryModal(service.title)}
                  >
                    Request Callback
                    <FaArrowRightLong />
                  </button>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <MagneticButton onClick={() => openEnquiryModal('Financial Planning')}>
          Book a Free Consultation
        </MagneticButton>
      </div>
    </section>
  )
}

export default ServicesSection
