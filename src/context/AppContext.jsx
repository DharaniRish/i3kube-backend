import { useMemo, useState } from 'react'
import { AppContext } from './contextStore'

export function AppProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    service: 'Financial Planning',
  })

  const openEnquiryModal = (service = 'Financial Planning') => {
    setModalState({ isOpen: true, service })
  }

  const closeEnquiryModal = () => {
    setModalState((current) => ({ ...current, isOpen: false }))
  }

  const value = useMemo(
    () => ({
      modalState,
      openEnquiryModal,
      closeEnquiryModal,
    }),
    [modalState],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
