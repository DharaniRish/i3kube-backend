import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa6'

function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl sm:bottom-24 sm:right-8 sm:h-12 sm:w-12"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}

export default BackToTopButton
