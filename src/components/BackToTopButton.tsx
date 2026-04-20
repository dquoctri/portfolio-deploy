import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 520)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.94 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={handleBackToTop}
          className="back-to-top neu-flat fixed bottom-6 right-4 z-[58] inline-flex h-14 w-14 items-center justify-center text-[var(--text-primary)] shadow-[var(--shadow-shell)] transition-transform duration-200 hover:-translate-y-1 sm:right-6"
        >
          <span className="material-symbols-outlined text-[22px]">arrow_upward</span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}
