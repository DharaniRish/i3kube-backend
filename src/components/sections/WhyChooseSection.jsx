import { motion } from 'framer-motion'
import { FaCirclePlus, FaShieldHalved } from 'react-icons/fa6'
import { differentiators, stats } from '../../constants/siteData'

const clientAvatars = [
  {
    name: 'Raj',
    image:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=96&q=80',
  },
  {
    name: 'Anika',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80',
  },
  {
    name: 'Meera',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=96&q=80',
  },
  {
    name: 'Priya',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=96&q=80',
  },
]

function WhyChooseSection() {
  const clientsStat = stats.find((stat) => stat.label === 'Happy Clients')
  const yearsStat = stats.find((stat) => stat.label === 'Years Experience')
  const displayedDifferentiators = differentiators.slice(0, 5)

  return (
    <section className="section-shell py-12 sm:py-14 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center xl:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -22 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="lg:sticky lg:top-30 lg:self-start"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#062B5B] shadow-sm">
            <span className="size-1.5 rounded-full bg-[#D4AF37]" />
            Why Choose Us
          </span>

          <h2 className="text-display mt-6 max-w-xl text-[clamp(1.5rem,2.45vw,2.4rem)] font-bold leading-[1.16] text-[#061936]">
            Corporate-level financial guidance designed to build trust and long-term confidence<span className="text-[#D4AF37]">.</span>
          </h2>

          <div className="mt-6 h-0.5 w-14 bg-[#D4AF37]" />

          <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
            Every interaction is designed to feel structured, transparent, and reassuring for clients making important money decisions.
          </p>

          <div className="mt-7 max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_26px_70px_-52px_rgba(6,43,91,0.45)]">
            <div className="grid gap-4 sm:grid-cols-[auto_1fr_1fr] sm:items-center sm:gap-5">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-xl text-[#C89400] sm:size-14">
                <FaShieldHalved aria-hidden="true" />
              </div>
              <div className="border-t border-slate-200 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <p className="text-display text-2xl font-bold text-[#C89400]">
                  {clientsStat?.value}
                  {clientsStat?.suffix}
                </p>
                <p className="mt-1 text-sm text-slate-600">{clientsStat?.label}</p>
              </div>
              <div className="border-t border-slate-200 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <p className="text-display text-2xl font-bold text-[#C89400]">
                  {yearsStat?.value}
                  {yearsStat?.suffix}
                </p>
                <p className="mt-1 text-sm text-slate-600">Years of Trust</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[15rem] text-sm leading-6 text-slate-600">
              Trusted by professionals, families, and businesses across India.
            </p>
            <div className="flex items-center">
              {clientAvatars.map((avatar) => (
                <img
                  key={avatar.name}
                  src={avatar.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="-ml-2 size-10 rounded-full border-2 border-white object-cover shadow-sm first:ml-0"
                />
              ))}
              <div className="-ml-2 flex size-10 items-center justify-center rounded-full border-2 border-white bg-[#062B5B] text-sm text-white shadow-sm">
                <FaCirclePlus aria-hidden="true" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {displayedDifferentiators.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group rounded-[1.35rem] border border-slate-200 bg-white/92 p-4 shadow-[0_24px_70px_-56px_rgba(6,43,91,0.5)] backdrop-blur transition duration-300 hover:border-[#D4AF37]/45 hover:shadow-[0_34px_86px_-54px_rgba(6,43,91,0.45)] sm:p-5"
              >
                <div className="grid gap-4 md:grid-cols-[auto_minmax(9rem,0.62fr)_1px_minmax(0,1fr)] md:items-center">
                  <div className="inline-flex size-15 items-center justify-center rounded-2xl bg-[#EEF4FF] text-2xl text-[#062B5B] transition duration-300 group-hover:bg-[#062B5B] group-hover:text-[#D4AF37]">
                    <Icon aria-hidden="true" />
                  </div>

                  <h3 className="text-display text-xl font-bold leading-tight text-[#061936]">
                    {item.title}
                  </h3>

                  <div className="hidden h-12 w-px bg-slate-200 md:block" />

                  <p className="text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseSection
