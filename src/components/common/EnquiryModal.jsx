import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark } from 'react-icons/fa6'
import { useAppContext } from '../../context/useAppContext'
import EnquiryForm from './EnquiryForm'

function EnquiryModal() {
  const { modalState, closeEnquiryModal } = useAppContext()

  return (
    <AnimatePresence>
      {modalState.isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={closeEnquiryModal}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeEnquiryModal}
              className="absolute right-3 top-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:text-slate-950"
              aria-label="Close callback form"
            >
              <FaXmark aria-hidden="true" />
            </button>
            <EnquiryForm
              compact
              defaultService={modalState.service}
              title="Request a callback"
              description="Share your goals and we’ll tailor the first conversation around your priorities."
              onSuccess={closeEnquiryModal}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default EnquiryModal
