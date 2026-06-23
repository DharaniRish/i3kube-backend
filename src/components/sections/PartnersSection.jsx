import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import SectionIntro from '../common/SectionIntro'
import { partners } from '../../constants/siteData'

function PartnersSection({ title = 'Trusted product and distribution partners.' }) {
  return (
    <section className="section-shell section-space">
      <SectionIntro
        eyebrow="Institutional Partners"
        title={title}
        description="Our network helps us align the right products and platforms to each client’s planning strategy."
      />

      <div className="mt-12">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4500}
          loop
          slidesPerView={1.2}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.name}>
              <div className="flex h-full flex-col justify-between rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[var(--shadow-card)]">
                <img src={partner.logo} alt={partner.name} className="h-20 w-full rounded-2xl object-cover" />
                <div className="mt-5">
                  <p className="text-display text-xl font-semibold text-slate-900">{partner.name}</p>
                  <p className="mt-2 text-sm text-slate-500">{partner.category}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default PartnersSection
