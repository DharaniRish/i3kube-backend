import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useScrollToTop() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      let attempts = 0
      let timeoutId

      const scrollToHash = () => {
        const target = document.querySelector(hash)

        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
          return
        }

        attempts += 1

        if (attempts < 10) {
          timeoutId = window.setTimeout(scrollToHash, 100)
        }
      }

      scrollToHash()

      return () => window.clearTimeout(timeoutId)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [hash, pathname])
}
