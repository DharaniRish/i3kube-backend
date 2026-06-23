import { motion, useScroll } from 'framer-motion'

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-[linear-gradient(90deg,#0B3C5D,#0F766E,#F59E0B)]"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

export default ScrollProgressBar
