import { useEffect, useRef } from 'react'
import { CountUp } from 'countup.js'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { stats } from '../../constants/siteData'

function AnimatedCounter({ end, isActive }) {
  const counterRef = useRef(null)

  useEffect(() => {
    if (!isActive || !counterRef.current) {
      return
    }

    const instance = new CountUp(counterRef.current, end, {
      duration: 2,
      useGrouping: true,
      separator: ',',
    })

    if (!instance.error) {
      instance.start()
    }
  }, [end, isActive])

  return <span ref={counterRef}>0</span>
}

function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 })

  return (
    <section ref={ref} className="section-shell pb-14">
      <div className="overflow-hidden rounded-[2.2rem] bg-[linear-gradient(135deg,#0B1F33,#003366,#005AA7)] px-6 py-8 text-white shadow-[0_35px_90px_-52px_rgba(11,31,51,0.65)] sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
              Trust Section
            </p>
            <h2 className="text-display mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Built on long-term relationships, not one-time transactions.
            </h2>
          </div>
          <div className="grid gap-6 border-t border-white/12 pt-6 sm:grid-cols-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
                className="relative"
          >
                <p className="text-display text-4xl font-bold text-white sm:text-[2.7rem]">
              {stat.prefix}
              <AnimatedCounter end={stat.value} isActive={inView} />
              {stat.suffix}
            </p>
                <p className="mt-3 text-sm uppercase tracking-[0.25em] text-white/60">
              {stat.label}
            </p>
                {index !== stats.length - 1 ? (
                  <div className="absolute -right-3 top-0 hidden h-full w-px bg-white/12 xl:block" />
                ) : null}
          </motion.div>
        ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
