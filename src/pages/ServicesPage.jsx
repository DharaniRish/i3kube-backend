import Seo from '../components/seo/Seo'
import PageHero from '../components/common/PageHero'
import ServicesSection from '../components/sections/ServicesSection'
import ProcessSection from '../components/sections/ProcessSection'
import CtaSection from '../components/sections/CtaSection'
import servicesBackground from '../assets/services_bg.png'

function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        path="/services"
        description="Explore premium advisory services for investments, insurance, financial planning, and loans."
      />
      <PageHero
        eyebrow="Services"
        title="Advice across investing, protection, lending, and strategic financial planning."
        description="Our service model is designed to move from discovery to implementation without overwhelming clients with generic product talk."
        backgroundImage={servicesBackground}
        fullWidth
      />
      <ServicesSection
        eyebrow="What We Offer"
        title="Specialized solutions delivered with one integrated relationship."
        description="Rather than silo decisions, we design a coordinated financial architecture so every recommendation strengthens the rest."
      />
      <ProcessSection />
      <CtaSection />
    </>
  )
}

export default ServicesPage
