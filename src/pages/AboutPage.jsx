import { FaChartLine, FaShieldHeart, FaUsers } from 'react-icons/fa6'
import Seo from '../components/seo/Seo'
import PageHero from '../components/common/PageHero'
import WhyChooseSection from '../components/sections/WhyChooseSection'
import CtaSection from '../components/sections/CtaSection'

function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        path="/about"
        description="Learn how I3CUBE helps clients build wealth, reduce risk, and make confident financial decisions."
      />
      <PageHero
        eyebrow="About I3CUBE"
        title="A premium financial advisory studio built around clarity, trust, and long-term outcomes."
        description="I3CUBE brings together investment strategy, insurance advice, and financial planning into one integrated client experience designed to feel modern, reassuring, and decisively useful."
      />

      <section className="section-shell section-space">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-card overflow-hidden p-6 sm:p-8">
            <div className="rounded-[2rem] bg-[linear-gradient(135deg,#0B3C5D,#0F766E)] p-8 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">Our Philosophy</p>
              <h2 className="text-display mt-4 text-4xl font-bold">Financial confidence should feel structured, not overwhelming.</h2>
              <p className="mt-5 text-base leading-8 text-white/80">
                We combine deep listening, rigorous planning, and conversion-focused execution so clients can move from uncertainty to action with momentum.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            {[
              {
                icon: FaChartLine,
                title: 'Outcome-led advice',
                description:
                  'We anchor every recommendation to a measurable milestone, whether that is wealth creation, protection, retirement, or liquidity.',
              },
              {
                icon: FaShieldHeart,
                title: 'Protection before performance',
                description:
                  'Risk cover and resilience are not afterthoughts. They are foundational to every strong financial plan.',
              },
              {
                icon: FaUsers,
                title: 'Relationship over transaction',
                description:
                  'We want the experience to feel like an ongoing strategic partnership, not a one-time sale.',
              },
            ].map((item) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="elevated-card flex gap-4 p-6">
                  <div className="rounded-2xl bg-slate-100 p-4 text-xl text-[var(--color-primary)]">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="text-display text-2xl font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <WhyChooseSection />
      <CtaSection />
    </>
  )
}

export default AboutPage
