import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { useAppContext } from '../../context/useAppContext'

function PageHero({
  eyebrow,
  title,
  description,
  primaryService = 'Financial Planning',
  backgroundImage,
  fullWidth = false,
}) {
  const { openEnquiryModal } = useAppContext()

  return (
    <section className={fullWidth ? 'pt-20' : 'section-shell pt-28 pb-10 sm:pt-32 sm:pb-12'}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative overflow-hidden border border-slate-200 shadow-[var(--shadow-soft)] ${fullWidth ? 'min-h-[calc(100svh-5rem)] rounded-none sm:min-h-[460px] lg:min-h-[540px]' : 'rounded-[1.6rem] px-5 py-10 sm:rounded-[2.2rem] sm:px-10 sm:py-12 lg:px-14'} ${backgroundImage ? 'bg-slate-950' : 'bg-white'}`}
      >
        {backgroundImage ? (
          <>
            <img
              src={backgroundImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/65" />
          </>
        ) : (
          <>
            <div className="mesh-orb left-[-3rem] top-[-2rem] h-40 w-40 bg-[rgba(0,90,167,0.14)]" />
            <div className="mesh-orb right-0 top-10 h-44 w-44 bg-[rgba(212,175,55,0.18)]" />
          </>
        )}
        <div className={fullWidth ? 'section-shell relative z-10 flex min-h-[calc(100svh-5rem)] flex-col items-start justify-center py-12 sm:min-h-[440px] sm:py-16 lg:min-h-[520px] lg:py-20' : 'relative z-10'}>
          <span className="label-chip">{eyebrow}</span>
          <h1 className={`text-display mt-5 max-w-[19ch] text-[clamp(2.25rem,10vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.035em] sm:mt-6 sm:max-w-[17ch] sm:text-[clamp(3rem,6vw,4.5rem)] lg:max-w-4xl lg:text-6xl ${backgroundImage ? 'text-white' : 'text-slate-900'}`}>
            {title}
          </h1>
          <p className={`mt-5 max-w-[38rem] text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8 ${backgroundImage ? 'text-white/85' : 'text-slate-600'}`}>
            {description}
          </p>
          <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            <MagneticButton containerClassName="w-full sm:w-auto" className="w-full sm:w-auto" onClick={() => openEnquiryModal(primaryService)}>
              Book Free Consultation
            </MagneticButton>
            <MagneticButton containerClassName="w-full sm:w-auto" className="w-full sm:w-auto" to="/#contact" variant="secondary">
              Request Callback
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default PageHero
