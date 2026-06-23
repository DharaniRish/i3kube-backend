import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRightLong } from 'react-icons/fa6'
import MagneticButton from '../common/MagneticButton'
import heroBg from '../../assets/hero-bg.png'
import heroBg1 from '../../assets/hero-bg1.png'
import heroBg2 from '../../assets/hero-bg2.png'
import { useAppContext } from '../../context/useAppContext'

const heroSlides = [
  {
    image: heroBg,
    label: 'Financial planning background',
    mobilePosition: '56% center',
    desktopPosition: 'center center',
  },
  {
    image: heroBg1,
    label: 'Investment advisory background',
    mobilePosition: '58% center',
    desktopPosition: 'center center',
  },
  {
    image: heroBg2,
    label: 'Insurance and wealth planning background',
    mobilePosition: '60% center',
    desktopPosition: 'center center',
  },
]

function HeroSection() {
  const { openEnquiryModal } = useAppContext()
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(slideTimer)
  }, [])

  return (
    <section className="relative isolate w-full overflow-hidden bg-[var(--color-bg)] pt-[theme(space.20)]">
      <div className="relative min-h-[calc(100svh-theme(space.20))] overflow-hidden bg-[#dbe5f0] shadow-[0_45px_100px_-56px_rgba(11,31,51,0.58)]">
        {heroSlides.map((slide, index) => (
          <motion.img
            key={slide.image}
            src={slide.image}
            alt=""
            aria-hidden="true"
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            initial={false}
            animate={{
              opacity: activeSlide === index ? 1 : 0,
              scale: activeSlide === index ? 1 : 1.04,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              '--hero-mobile-position': slide.mobilePosition,
              '--hero-desktop-position': slide.desktopPosition,
            }}
            className="absolute inset-0 h-full w-full object-cover [object-position:var(--hero-mobile-position)] lg:[object-position:var(--hero-desktop-position)]"
          />
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,25,45,.9)_0%,rgba(8,25,45,.76)_46%,rgba(8,25,45,.46)_100%)] lg:bg-[linear-gradient(90deg,rgba(8,25,45,.9)_0%,rgba(8,25,45,.84)_36%,rgba(8,25,45,.42)_58%,rgba(8,25,45,.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,51,102,.2),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(212,175,55,.16),transparent_32%)]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-theme(space.20))] w-full max-w-[96rem] flex-col px-4 py-8 sm:px-6 sm:py-14 lg:px-8 lg:py-20 xl:px-10 2xl:max-w-[108rem]">
          <div className="grid flex-1 items-start gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,52%)_minmax(0,48%)] lg:items-center xl:grid-cols-[minmax(0,45%)_minmax(0,55%)]">
            <div className="flex max-w-[46rem] flex-col gap-[clamp(1.25rem,2.6vw,2.75rem)] lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                  className="w-fit max-w-full rounded-full border border-white/18 bg-white/10 px-[clamp(0.75rem,1.1vw,1rem)] py-[clamp(0.4rem,0.6vw,0.55rem)] text-[clamp(0.62rem,0.72vw,0.78rem)] font-semibold uppercase tracking-[0.16em] text-white/78 backdrop-blur sm:tracking-[0.28em] lg:tracking-[0.32em]"
              >
                Invest • Insure • Income
              </motion.div>

              <div className="flex flex-col gap-[clamp(1rem,2vw,1.5rem)]">
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-display text-[clamp(2.15rem,10.4vw,6.35rem)] font-bold leading-[1.02] text-white sm:text-[clamp(2.75rem,6.5vw,6.35rem)] lg:leading-[0.96]"
                >
                  <span className="block md:whitespace-nowrap">Invest Smart.</span>
                  <span className="block md:whitespace-nowrap">Protect Your Future.</span>
                  <span className="block md:whitespace-nowrap">Build Lasting Wealth.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08 }}
                  className="max-w-[46rem] text-[clamp(0.95rem,1.25vw,1.35rem)] leading-[1.7] text-white/84"
                >
                  Helping individuals, families, and businesses make sharper decisions across investments, insurance, retirement, and long-term financial planning.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.14 }}
                className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4"
              >
                <MagneticButton
                  onClick={() => openEnquiryModal('Financial Planning')}
                  containerClassName="w-full sm:w-auto"
                  className="min-h-[clamp(3rem,3.4vw,3.6rem)] w-full px-[clamp(1rem,1.7vw,1.65rem)] text-[clamp(0.68rem,0.78vw,0.92rem)] sm:w-auto"
                >
                  Book Free Consultation
                </MagneticButton>
                <MagneticButton
                  to="/services"
                  variant="secondary"
                  containerClassName="w-full sm:w-auto"
                  className="min-h-[clamp(3rem,3.4vw,3.6rem)] w-full px-[clamp(1rem,1.7vw,1.65rem)] text-[clamp(0.68rem,0.78vw,0.92rem)] sm:w-auto"
                >
                  <span className="inline-flex items-center gap-2">
                    Explore Services
                    <FaArrowRightLong aria-hidden="true" />
                  </span>
                </MagneticButton>
              </motion.div>
            </div>

            <div aria-hidden="true" className="hidden lg:block" />
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-8 sm:justify-start lg:pt-10">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => setActiveSlide(index)}
                className="group flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={`Show ${slide.label}`}
                aria-pressed={activeSlide === index}
              >
                <span
                  aria-hidden="true"
                  className={`h-2.5 rounded-full transition-all ${
                    activeSlide === index ? 'w-10 bg-white' : 'w-2.5 bg-white/45 group-hover:bg-white/75'
                  }`}
                />
                <span className="sr-only">{`Show ${slide.label}`}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
