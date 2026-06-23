import Seo from '../components/seo/Seo'
import HeroSection from '../components/sections/HeroSection'
import QuickServicesSection from '../components/sections/QuickServicesSection'
import AboutPreviewSection from '../components/sections/AboutPreviewSection'
import WhyChooseSection from '../components/sections/WhyChooseSection'
import ProcessSection from '../components/sections/ProcessSection'
import PartnersSection from '../components/sections/PartnersSection'
import CalculatorHub from '../components/calculators/CalculatorHub'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import BlogSection from '../components/sections/BlogSection'
import FaqSection from '../components/sections/FaqSection'
import CtaSection from '../components/sections/CtaSection'

function HomePage() {
  return (
    <>
      <Seo />
      <HeroSection />
      <QuickServicesSection />
      <AboutPreviewSection />
      <WhyChooseSection />
      <ProcessSection />
      <PartnersSection />
      <CalculatorHub />
      <TestimonialsSection />
      <BlogSection />
      <FaqSection />
      <CtaSection />
    </>
  )
}

export default HomePage
