import { motion } from 'framer-motion'

function SectionIntro({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
      className={`max-w-3xl ${alignment}`}
    >
      {eyebrow ? <span className="label-chip">{eyebrow}</span> : null}
      <h2 className="text-display mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-[3rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
      ) : null}
    </motion.div>
  )
}

export default SectionIntro
