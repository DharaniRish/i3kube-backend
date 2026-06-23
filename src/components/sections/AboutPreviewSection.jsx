import { motion } from 'framer-motion'
import { FaBullseye, FaCircleCheck, FaEye, FaShieldHalved, FaUsers } from 'react-icons/fa6'
import { aboutPreview } from '../../constants/siteData'

const trustSignals = [
  'Structured discovery and risk profiling',
  'Independent and objective advice',
  'Transparent recommendations aligned to your goals',
  'Long-term service and review commitment',
]

function AboutPreviewSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-[1500px] scroll-mt-24 px-4 py-5 sm:px-6 sm:py-6 lg:px-[5vw] lg:py-7">
      <div className="grid gap-5 lg:grid-cols-[0.96fr_0.94fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[1.65rem] bg-slate-100 shadow-[0_30px_82px_-54px_rgba(11,31,51,0.5)]"
        >
          <div className="photo-overlay relative">
            <img
              src={aboutPreview.image}
              alt="Professional financial advisory office"
              className="h-[320px] w-full object-cover sm:h-[350px] lg:h-[380px]"
            />
          </div>
          <div className="absolute bottom-4 right-4 w-[min(78%,16rem)] rounded-[1.15rem] bg-[#061936] p-4 text-white shadow-[0_28px_74px_-40px_rgba(6,25,54,0.85)] sm:bottom-5 sm:right-5">
            <div className="inline-flex size-9 items-center justify-center rounded-lg bg-[#D4AF37]/18 text-sm text-[#D4AF37]">
              <FaEye aria-hidden="true" />
            </div>
            <p className="mt-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              Our Vision
            </p>
            <p className="mt-2 text-xs leading-5 text-white/92 sm:text-sm sm:leading-6">
              {aboutPreview.vision}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.5 }}
          className="lg:pl-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-900 shadow-sm">
            <span className="size-1.5 rounded-full bg-[#D4AF37]" />
            About I3CUBE
          </span>
          <h2 className="text-display mt-4 max-w-2xl text-[clamp(1.45rem,2.4vw,2.25rem)] font-bold leading-[1.12] text-slate-950">
           Smart Investment Solutions<span className="text-[#D4AF37]">.</span>
          </h2>
          <div className="mt-3 h-0.5 w-14 bg-[#D4AF37]" />
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            {aboutPreview.story}
          </p>

          <div className="mt-3 space-y-2.5">
            <div className="flex gap-4 rounded-[1rem] border border-slate-200 bg-white p-4 shadow-[var(--shadow-card)]">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/12 text-base text-[#D4AF37]">
                <FaBullseye aria-hidden="true" />
              </div>
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#061936]">
                  Our Mission
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-700 sm:text-sm">
                  {aboutPreview.mission}
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-[1rem] border border-slate-200 bg-white p-4 shadow-[var(--shadow-card)]">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/12 text-base text-[#D4AF37]">
                <FaUsers aria-hidden="true" />
              </div>
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#061936]">
                  Our Promise
                </p>
                <p className="mt-2 text-sm leading-5 text-slate-700">
                  Independent advice. Personalized strategies. Long-term partnership.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.86fr_0.94fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 rounded-[1.15rem] bg-[#061936] p-4 text-white shadow-[0_30px_82px_-54px_rgba(6,25,54,0.85)] sm:p-5"
        >
          <div className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl text-[#D4AF37]">
            <FaShieldHalved aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-display text-base font-bold uppercase tracking-[0.04em] sm:text-lg">
              Why Clients Trust Us
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/86">
              We combine institutional discipline, personal attention, and a long-term advisory mindset.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="rounded-[1.15rem] bg-[linear-gradient(135deg,#ffffff,#f3f6fb)] p-4 shadow-[var(--shadow-card)] sm:p-5"
        >
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#061936]">
            Client Trust Signals
          </p>
          <div className="mt-2 divide-y divide-slate-200/80">
            {trustSignals.map((point) => (
              <div key={point} className="flex items-center gap-3 py-2 text-sm leading-5 text-slate-700">
                <FaCircleCheck className="shrink-0 text-[#D4AF37]" aria-hidden="true" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutPreviewSection
