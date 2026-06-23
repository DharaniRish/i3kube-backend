import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaArrowRightLong,
  FaChartLine,
  FaClock,
  FaGraduationCap,
  FaHouseChimney,
  FaShieldHalved,
  FaStar,
  FaUser,
} from 'react-icons/fa6'
import { FaPercentage, FaSignal } from 'react-icons/fa'
import api from '../../services/api'
import { blogs as fallbackBlogs } from '../../constants/siteData'
import { imageFallbackHandler, resolveImageUrl } from '../../utils/imageUrl'

const categories = [
  { label: 'Investment Planning', icon: FaChartLine, tone: 'bg-blue-50 text-blue-700' },
  { label: 'Insurance', icon: FaShieldHalved, tone: 'bg-emerald-50 text-emerald-700' },
  { label: 'Tax Planning', icon: FaPercentage, tone: 'bg-amber-50 text-amber-700' },
  { label: 'Market Updates', icon: FaSignal, tone: 'bg-violet-50 text-violet-700' },
  { label: 'Loans & Credit', icon: FaHouseChimney, tone: 'bg-orange-50 text-orange-700' },
  { label: 'Retirement Planning', icon: FaUser, tone: 'bg-sky-50 text-sky-700' },
  { label: 'Child Education', icon: FaGraduationCap, tone: 'bg-blue-50 text-blue-700' },
]

const articleImages = [
  'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80',
]

const topicChips = [
  ['SIP Planning', FaChartLine, 'bg-blue-50 text-blue-700'],
  ['Health Insurance', FaShieldHalved, 'bg-emerald-50 text-emerald-700'],
  ['Tax Saving', FaPercentage, 'bg-amber-50 text-amber-700'],
  ['Market Outlook', FaSignal, 'bg-violet-50 text-violet-700'],
  ['Retirement', FaUser, 'bg-orange-50 text-orange-700'],
  ['Child Education', FaGraduationCap, 'bg-blue-50 text-blue-700'],
]

function BlogSection() {
  const [blogs, setBlogs] = useState(fallbackBlogs)
  const featuredBlog = blogs[0]
  const latestArticles = blogs.slice(1, 4)

  useEffect(() => {
    let ignore = false

    async function loadBlogs() {
      try {
        const response = await api.get('/blogs')
        const publishedBlogs = response.data.filter((blog) => blog.published !== false)

        if (!ignore) {
          setBlogs(publishedBlogs)
        }
      } catch {
        if (!ignore) {
          setBlogs(fallbackBlogs)
        }
      }
    }

    loadBlogs()

    return () => {
      ignore = true
    }
  }, [])

  if (!featuredBlog) {
    return null
  }

  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 md:py-12 lg:px-8 lg:py-14 xl:px-[5vw]">
      <div className="grid gap-6 lg:grid-cols-[minmax(17rem,0.32fr)_minmax(0,0.68fr)] xl:gap-8">
        <motion.aside
          initial={{ opacity: 0, x: -22 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="min-w-0"
        >
          <div className="h-0.5 w-14 bg-[#D4AF37]" />
          <p className="mt-5 text-[0.75rem] font-bold uppercase tracking-[0.32em] text-[#061936]">
            Blog & Insights
          </p>
          <h2 className="text-display mt-5 max-w-2xl text-[clamp(1.45rem,5.5vw,2.25rem)] font-bold leading-[1.15] text-[#061936] sm:mt-6 lg:max-w-md lg:text-[clamp(1.65rem,2.6vw,2.35rem)]">
            Insights that help you make smarter financial decisions<span className="text-[#D4AF37]">.</span>
          </h2>
          <div className="mt-5 h-0.5 w-10 bg-[#D4AF37]" />
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:max-w-sm">
            Practical articles on investing, protection, tax planning and more,
            written to help you plan with clarity and confidence.
          </p>

          <div className="mt-6 rounded-[1rem] border border-slate-200 bg-white p-4 shadow-[var(--shadow-card)] sm:p-5">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#061936]">
              Explore By Category
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {categories.map((category) => {
                const Icon = category.icon

                return (
                  <Link
                    key={category.label}
                    to="/blog"
                    className="flex min-h-10 min-w-0 items-center justify-between gap-3 rounded-lg px-2 text-sm font-semibold text-[#061936] transition hover:bg-slate-50"
                    style={{ color: '#061936' }}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${category.tone}`}>
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="truncate">{category.label}</span>
                    </span>
                    <FaArrowRightLong className="text-xs" aria-hidden="true" />
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mt-5 rounded-[1rem] bg-[#061936] p-4 text-white shadow-[0_30px_82px_-54px_rgba(6,25,54,0.85)] sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <span className="flex size-13 shrink-0 items-center justify-center rounded-full border border-[#D4AF37] text-xl text-[#D4AF37]">
                <FaUser aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-display text-lg font-bold">Need Personal Advice?</p>
                <p className="mt-2 text-sm leading-6 text-white/86">
                  Our financial experts are here to help you plan the right way.
                </p>
                <Link
                  to="/#contact"
                  className="mt-4 inline-flex min-h-10 max-w-full items-center justify-center gap-3 rounded-lg border border-[#D4AF37] px-3 text-center text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#061936] sm:px-4 sm:text-[0.72rem] sm:tracking-[0.18em]"
                  style={{ color: '#D4AF37' }}
                >
                  Book Free Consultation
                  <FaArrowRightLong aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </motion.aside>

        <div className="min-w-0">
          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="grid overflow-hidden rounded-[1rem] border border-slate-200 bg-white shadow-[0_30px_82px_-54px_rgba(6,25,54,0.55)] md:grid-cols-[0.42fr_0.58fr]"
          >
            <div className="photo-overlay relative min-h-[13rem] overflow-hidden sm:min-h-[15rem] md:min-h-full">
              <img
                src={resolveImageUrl(featuredBlog.coverImage, articleImages[0])}
                alt={featuredBlog.title}
                className="h-full w-full object-cover"
                onError={imageFallbackHandler(articleImages[0])}
              />
            </div>
            <div className="bg-[#061936] p-5 text-white sm:p-8">
              <span className="inline-flex max-w-full items-center gap-2 rounded-lg border border-[#D4AF37]/70 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#D4AF37] sm:tracking-[0.18em]">
                <FaStar aria-hidden="true" />
                Featured
              </span>
              <p className="mt-5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#D4AF37] sm:mt-6 sm:text-[0.72rem] sm:tracking-[0.26em]">
                {featuredBlog.category}
              </p>
              <h3 className="text-display mt-4 max-w-xl text-[clamp(1.45rem,6vw,2.35rem)] font-bold leading-tight md:text-[clamp(1.6rem,2.6vw,2.35rem)]">
                {featuredBlog.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/88 sm:text-base">
                {featuredBlog.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <span className="inline-flex items-center gap-2 text-sm text-white/90">
                  <FaClock aria-hidden="true" />
                  {featuredBlog.readTime}
                </span>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-3 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-[#D4AF37]"
                  style={{ color: '#D4AF37' }}
                >
                  Read Article
                  <FaArrowRightLong aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.article>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-display text-[1.45rem] font-bold text-[#061936] sm:text-2xl">Latest Articles</h3>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-blue-700 sm:gap-3 sm:text-sm sm:tracking-[0.16em]"
              style={{ color: '#1d4ed8' }}
            >
              View All Articles
              <FaArrowRightLong aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {latestArticles.map((article, index) => (
              <motion.article
                key={article._id || article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="overflow-hidden rounded-[0.9rem] border border-slate-200 bg-white shadow-[var(--shadow-card)]"
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={resolveImageUrl(article.coverImage, articleImages[index + 1] || articleImages[0])}
                    alt={article.title}
                    className="h-full w-full object-cover"
                    onError={imageFallbackHandler(articleImages[index + 1] || articleImages[0])}
                  />
                </div>
                <div className="p-4">
                  <p className={`text-[0.68rem] font-bold uppercase tracking-[0.18em] ${
                    index === 0 ? 'text-emerald-700' : index === 1 ? 'text-[#D4AF37]' : 'text-violet-700'
                  }`}
                  >
                    {article.category}
                  </p>
                  <h4 className="text-display mt-3 text-lg font-bold leading-snug text-[#061936]">
                    {article.title}
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{article.excerpt}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                      <FaClock aria-hidden="true" />
                      {article.readTime}
                    </span>
                    <Link
                      to="/blog"
                      className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#061936]"
                      style={{ color: '#061936' }}
                    >
                      Read More
                      <FaArrowRightLong aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-5">
            <div className="rounded-[0.9rem] border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#061936]">
                Trending Topics
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {topicChips.map(([label, Icon, tone]) => (
                  <Link
                    key={label}
                    to="/blog"
                    className="inline-flex min-h-9 min-w-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-[#061936] shadow-sm"
                    style={{ color: '#061936' }}
                  >
                    <span className={`flex size-7 items-center justify-center rounded-full ${tone}`}>
                      <Icon aria-hidden="true" />
                    </span>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
