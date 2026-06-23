import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import EnquiryModal from '../common/EnquiryModal'
import BackToTopButton from '../common/BackToTopButton'
import ScrollProgressBar from '../common/ScrollProgressBar'
import CursorGlow from '../common/CursorGlow'
import useScrollToTop from '../../hooks/useScrollToTop'
import { officeDetails } from '../../constants/siteData'

function SiteLayout() {
  useScrollToTop()

  return (
    <div className="relative overflow-x-clip">
      <ScrollProgressBar />
      <CursorGlow />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <a
        href={`https://wa.me/${officeDetails.whatsapp.replace(/\D/g, '')}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-2xl sm:bottom-5 sm:right-8 sm:gap-3 sm:px-5"
      >
        WhatsApp
      </a>
      <BackToTopButton />
      <EnquiryModal />
    </div>
  )
}

export default SiteLayout
