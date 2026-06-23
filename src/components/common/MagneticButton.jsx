import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function MagneticButton({
  children,
  className = '',
  containerClassName = '',
  to,
  href,
  onClick,
  variant = 'primary',
  type = 'button',
}) {
  const [magnet, setMagnet] = useState({ x: 0, y: 0 })

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12
    setMagnet({ x, y })
  }

  const reset = () => setMagnet({ x: 0, y: 0 })

  const classes =
    variant === 'secondary'
      ? 'border border-slate-300 bg-white text-slate-800 shadow-sm hover:border-slate-400'
      : 'bg-[var(--color-primary)] text-white shadow-[0_20px_45px_-25px_rgba(11,60,93,0.85)] hover:bg-[#082d47]'

  const content = (
    <span
      className={`inline-flex min-w-0 items-center justify-center rounded-full px-6 py-3 text-center text-sm font-semibold uppercase leading-tight tracking-[0.12em] transition sm:tracking-[0.18em] ${classes} ${className}`}
    >
      {children}
    </span>
  )

  return (
    <motion.div
      animate={magnet}
      transition={{ type: 'spring', stiffness: 240, damping: 16 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-flex ${containerClassName}`}
    >
      {to ? (
        <Link to={to} className="w-full">
          {content}
        </Link>
      ) : href ? (
        <a href={href} target="_blank" rel="noreferrer" className="w-full">
          {content}
        </a>
      ) : (
        <button type={type} onClick={onClick} className="w-full">
          {content}
        </button>
      )}
    </motion.div>
  )
}

export default MagneticButton
