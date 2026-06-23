import Seo from '../components/seo/Seo'
import PageHero from '../components/common/PageHero'
import CalculatorHub from '../components/calculators/CalculatorHub'
import CtaSection from '../components/sections/CtaSection'

function CalculatorsPage() {
  return (
    <>
      <Seo
        title="Calculators"
        path="/calculators"
        description="Use I3CUBE financial calculators for SIP, EMI, retirement, and child education planning."
      />
      <PageHero
        eyebrow="Calculators"
        title="Planning tools that make your financial decisions more concrete."
        description="Run scenarios for investing, borrowing, retirement readiness, and future education costs with charts that update instantly."
        primaryService="Retirement Planning"
      />
      <CalculatorHub />
      <CtaSection />
    </>
  )
}

export default CalculatorsPage
