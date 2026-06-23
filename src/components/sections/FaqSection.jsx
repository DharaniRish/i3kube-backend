import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaPlus, FaMinus } from 'react-icons/fa6'
import SectionIntro from '../common/SectionIntro'
import { faqs } from '../../constants/siteData'

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section-shell section-space">
      <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionIntro
            eyebrow="FAQ"
            title="Answers to the questions clients usually ask before getting started."
            description="The aim is to make the first step feel informed, not intimidating."
          />
          <div className="mt-8 rounded-[2rem] bg-[linear-gradient(135deg,#003366,#0B1F33)] p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Need more clarity?</p>
            <p className="mt-4 text-lg leading-8 text-white/82">
              We’ll walk you through products, process, and suitability before anything moves forward.
            </p>
          </div>
        </div>

        <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index

          return (
            <div key={faq.question} className="elevated-card overflow-hidden">
              <button
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span className="text-display text-xl font-semibold text-slate-900">
                  {faq.question}
                </span>
                <span className="rounded-full bg-slate-100 p-3 text-slate-600">
                  {isOpen ? <FaMinus /> : <FaPlus />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden px-6"
                  >
                    <p className="pb-6 text-sm leading-7 text-slate-600">{faq.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
