import Seo from '../components/seo/Seo'
import PageHero from '../components/common/PageHero'
import PartnersSection from '../components/sections/PartnersSection'
import { partners } from '../constants/siteData'

function PartnersPage() {
  return (
    <>
      <Seo
        title="Partners"
        path="/partners"
        description="Discover the financial product and distribution partners that support I3CUBE advisory solutions."
      />
      <PageHero
        eyebrow="Partners"
        title="A curated ecosystem of trusted financial and insurance institutions."
        description="We work with established insurers, mutual fund houses, and wealth platforms to align recommendations with each client’s planning context."
        primaryService="Investment Planning"
      />

      <section className="section-shell section-space">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {partners.map((partner) => (
            <article key={partner.name} className="elevated-card p-6">
              <img src={partner.logo} alt={partner.name} className="h-20 w-full rounded-2xl object-cover" />
              <h3 className="text-display mt-5 text-2xl font-semibold text-slate-900">{partner.name}</h3>
              <p className="mt-2 text-sm text-slate-500">{partner.category}</p>
            </article>
          ))}
        </div>
      </section>

      <PartnersSection title="We choose partners that support both trust and strategic flexibility." />
    </>
  )
}

export default PartnersPage
