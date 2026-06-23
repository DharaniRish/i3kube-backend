import { motion } from 'framer-motion'
import {
  FaArrowTrendUp,
  FaChartLine,
  FaFileInvoiceDollar,
  FaHandshake,
  FaLock,
  FaMedal,
  FaPeopleGroup,
  FaShieldHalved,
  FaTrophy,
} from 'react-icons/fa6'

const processCards = [
  {
    title: 'Book Consultation',
    description: 'Tell us about your goals and financial priorities.',
    icon: FaPeopleGroup,
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=700&q=80',
  },
  {
    title: 'Financial Analysis',
    description: 'We analyze your financial situation and identify opportunities.',
    icon: FaFileInvoiceDollar,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80',
  },
  {
    title: 'Personalized Strategy',
    description: 'We create a customized plan aligned with your goals and risk profile.',
    icon: FaTrophy,
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&q=80',
  },
  {
    title: 'Implementation',
    description: 'We put the strategy into action with the right solutions.',
    icon: FaHandshake,
    image:
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=700&q=80',
  },
  {
    title: 'Review & Grow',
    description: 'We monitor progress, review regularly, and help you grow continuously.',
    icon: FaChartLine,
    image:
      'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=700&q=80',
  },
]

const trustPoints = [
  {
    title: 'Client First',
    description: 'Your goals come first',
    icon: FaShieldHalved,
  },
  {
    title: 'Secure & Private',
    description: 'Your data is always protected',
    icon: FaLock,
  },
  {
    title: 'Expert Advisors',
    description: 'Experienced professionals',
    icon: FaMedal,
  },
  {
    title: 'Long-term Partnership',
    description: 'We grow with you, always',
    icon: FaHandshake,
  },
]

function ProcessSection() {
  return (
    <section className="section-shell py-8 sm:py-10 lg:py-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#DDE7F5] bg-[linear-gradient(180deg,#F5F9FF_0%,#FFFFFF_62%,#F4F8FF_100%)] px-4 py-6 shadow-[0_30px_90px_-62px_rgba(6,43,91,0.55)] sm:px-6 lg:px-8 lg:py-8">
        <div className="pointer-events-none absolute left-0 top-0 h-52 w-52 rounded-full border border-[#D7E4F8]" />
        <div className="pointer-events-none absolute left-8 top-8 grid grid-cols-4 gap-4 opacity-40">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index} className="size-1 rounded-full bg-[#8AA7D8]" />
          ))}
        </div>
        <div className="pointer-events-none absolute right-8 top-12 hidden h-72 w-[28rem] opacity-70 lg:block">
          <div className="absolute bottom-0 right-0 h-40 w-10 bg-[#EAF1FC]" />
          <div className="absolute bottom-0 right-16 h-28 w-10 bg-[#EAF1FC]" />
          <div className="absolute bottom-0 right-32 h-20 w-10 bg-[#EAF1FC]" />
          <div className="absolute right-10 top-3 h-40 w-40 rotate-45 border-t-2 border-[#D4AF37]" />
          <FaArrowTrendUp className="absolute right-2 top-0 text-3xl text-[#D4AF37]" aria-hidden="true" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex items-center gap-5 rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#062B5B] shadow-sm">
            <span className="size-2 rotate-45 bg-[#D4AF37]" />
            How It Works
            <span className="size-2 rotate-45 bg-[#D4AF37]" />
          </span>

          <h2 className="text-display mt-4 text-[clamp(1.5rem,2.45vw,2.45rem)] font-bold leading-[1.14] text-[#062B5B]">
            A Simple 5-Step Process <br className="hidden md:block" />
            to Financial <span className="text-[#C89400]">Clarity & Growth</span>
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-18 bg-[#D4AF37]" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600">
            Our proven process helps you make confident decisions and achieve your financial goals.
          </p>
        </motion.div>

        <div className="relative mt-7">
          <div className="absolute left-[8%] right-[8%] top-7 hidden h-px bg-[#062B5B] xl:block" />
          <div className="absolute left-[8%] right-[8%] top-7 hidden h-px bg-[linear-gradient(90deg,#062B5B_0%,#D4AF37_22%,#062B5B_48%,#D4AF37_72%,#062B5B_100%)] xl:block" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {processCards.map((step, index) => {
              const Icon = step.icon
              const isGold = index === 1 || index === 3

              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="group relative pt-9 xl:pt-13"
                >
                  <div
                    className={`absolute left-1/2 top-0 z-10 flex size-12 -translate-x-1/2 items-center justify-center rounded-full text-lg font-bold text-white shadow-[0_20px_45px_-26px_rgba(6,43,91,0.8)] ring-4 ring-white ${
                      isGold ? 'bg-[#C89400]' : 'bg-[#062B5B]'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="flex h-full min-h-[265px] flex-col overflow-hidden rounded-[1.25rem] border border-[#DDE7F5] bg-white shadow-[0_24px_70px_-55px_rgba(6,43,91,0.48)] transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_34px_86px_-54px_rgba(6,43,91,0.42)]">
                    <div className="relative h-26 overflow-hidden bg-[#062B5B]">
                      <img
                        src={step.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#062B5B]/16" />
                    </div>

                    <div
                      className={`relative z-10 mx-auto -mt-3 flex size-13 items-center justify-center rounded-full text-xl text-white shadow-[0_18px_44px_-26px_rgba(6,43,91,0.82)] ring-4 ring-white ${
                        isGold ? 'bg-[#C89400]' : 'bg-[#062B5B]'
                      }`}
                    >
                      <Icon aria-hidden="true" />
                    </div>

                    <div className="flex flex-1 flex-col px-4 pb-5 pt-4 text-center">
                      <h3 className="text-display text-lg font-bold leading-tight text-[#062B5B]">
                        {step.title}
                      </h3>
                      <div className="mx-auto mt-3 h-0.5 w-9 bg-[#D4AF37]" />
                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="mt-6 rounded-[1.35rem] border border-[#DDE7F5] bg-white/78 p-4 shadow-[0_24px_70px_-58px_rgba(6,43,91,0.5)] backdrop-blur"
        >
          <div className="grid gap-5 lg:grid-cols-[auto_1px_1fr] lg:items-center">
            <div className="flex items-center gap-5">
              <div className="flex size-16 items-center justify-center rounded-full bg-[#062B5B] text-2xl text-[#D4AF37] ring-8 ring-[#EDF4FF]">
                <FaTrophy aria-hidden="true" />
              </div>
              <div>
                <p className="text-display text-xl font-bold leading-tight text-[#062B5B]">
                  Your goals.
                  <br />
                  Our process.
                </p>
                <p className="mt-1 font-serif text-xl italic text-[#C89400]">Better Future.</p>
              </div>
            </div>

            <div className="hidden h-16 w-px bg-[#DDE7F5] lg:block" />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {trustPoints.map((point) => {
                const Icon = point.icon

                return (
                  <div key={point.title} className="flex items-center gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#EAF1FF] text-lg text-[#062B5B]">
                      <Icon aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#062B5B]">{point.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{point.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProcessSection
