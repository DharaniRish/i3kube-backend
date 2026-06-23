import { FaEnvelope, FaLocationDot, FaPhoneVolume, FaWhatsapp } from 'react-icons/fa6'
import EnquiryForm from '../common/EnquiryForm'
import { officeDetails } from '../../constants/siteData'

const contactMethods = [
  { icon: FaLocationDot, label: 'Office Address', value: officeDetails.address },
  { icon: FaPhoneVolume, label: 'Phone', value: officeDetails.phone, href: `tel:${officeDetails.phone.replace(/\D/g, '')}` },
  { icon: FaEnvelope, label: 'Email', value: officeDetails.email, href: `mailto:${officeDetails.email}` },
  { icon: FaWhatsapp, label: 'WhatsApp', value: officeDetails.phone, href: `https://wa.me/${officeDetails.whatsapp.replace(/\D/g, '')}` },
]

function CtaSection() {
  return (
    <section id="contact" className="section-shell scroll-mt-24 py-12 sm:py-16 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.6rem] bg-[#061936] p-6 text-white shadow-[0_30px_82px_-54px_rgba(6,25,54,0.85)] sm:p-8">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
            Contact Us
          </p>
          <h2 className="text-display mt-4 text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-tight">
            Let’s discuss your financial priorities.
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
            Reach us directly or send your details using the form. Our team will get back to you shortly.
          </p>

          <div className="mt-7 space-y-3">
            {contactMethods.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/15 text-[#D4AF37]">
                  <Icon aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/55">{label}</p>
                  {href ? (
                    <a href={href} className="mt-1 block break-words text-sm font-medium text-white transition hover:text-[#D4AF37]">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 break-words text-sm font-medium text-white">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <EnquiryForm
          title="Send us a message"
          description="Share your details and the area where you need support."
        />
      </div>
    </section>
  )
}

export default CtaSection
