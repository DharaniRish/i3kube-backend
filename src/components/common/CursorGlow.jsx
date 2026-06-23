import { useEffect, useState, useEffectEvent } from 'react'

function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 })

  const updatePosition = useEffectEvent((event) => {
    setPosition({ x: event.clientX - 80, y: event.clientY - 80 })
  })

  useEffect(() => {
    window.addEventListener('mousemove', updatePosition, { passive: true })

    return () => {
      window.removeEventListener('mousemove', updatePosition)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed z-[1] hidden h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.16),transparent_70%)] blur-2xl lg:block"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    />
  )
}

export default CursorGlow
