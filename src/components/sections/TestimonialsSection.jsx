import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa6'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import SectionIntro from '../common/SectionIntro'
import api from '../../services/api'
import { testimonials as fallbackTestimonials } from '../../constants/siteData'

function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials)

  useEffect(() => {
    let ignore = false

    async function loadTestimonials() {
      try {
        const response = await api.get('/testimonials')
        const featuredTestimonials = response.data.filter((testimonial) => testimonial.featured !== false)

        if (!ignore) {
          setTestimonials(featuredTestimonials)
        }
      } catch {
        if (!ignore) {
          setTestimonials(fallbackTestimonials)
        }
      }
    }

    loadTestimonials()

    return () => {
      ignore = true
    }
  }, [])

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="[&_h2]:text-2xl sm:[&_h2]:text-3xl lg:[&_h2]:text-[2.25rem]">
        <SectionIntro
          eyebrow="Success Stories"
          title="Real client outcomes shaped by thoughtful planning and steady support."
          description="These success stories highlight how investment discipline, risk protection, and planning clarity work together in real lives."
        />
      </div>

      <div className="mt-7">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={24}
          loop={testimonials.length > 2}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4200, disableOnInteraction: false }}
          breakpoints={{ 1024: { slidesPerView: 2.1 } }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial._id || testimonial.name}>
              <article className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[var(--shadow-card)]">
                <div className="photo-overlay relative h-40 overflow-hidden sm:h-44">
                  <img
                    src={testimonial.image || testimonial.avatar || fallbackTestimonials[0].image}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    Client Story
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar || fallbackTestimonials[0].avatar}
                      alt={testimonial.name}
                      className="h-14 w-14 rounded-[1rem] object-cover"
                    />
                    <div>
                      <h3 className="text-display text-lg font-semibold text-slate-900">
                        {testimonial.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-1 text-sm text-[var(--color-accent)]">
                    {Array.from({ length: Number(testimonial.rating || 5) }).map((_, index) => (
                      <FaStar key={`${testimonial.name}-${index}`} />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">“{testimonial.quote}”</p>
                  {testimonial.metric ? (
                    <div className="mt-4 rounded-[1rem] bg-slate-50 px-4 py-3 text-sm font-semibold text-[var(--color-primary)]">
                      {testimonial.metric}
                    </div>
                  ) : null}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default TestimonialsSection
