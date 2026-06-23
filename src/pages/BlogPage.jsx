import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/common/PageHero'
import api from '../services/api'
import { blogs as fallbackBlogs } from '../constants/siteData'
import { imageFallbackHandler, resolveImageUrl } from '../utils/imageUrl'
import servicesBackground from '../assets/blog_bg.png'

const fallbackImage = 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=1200&q=80'

function BlogPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [blogs, setBlogs] = useState(fallbackBlogs)
  const [loading, setLoading] = useState(true)
  const deferredQuery = useDeferredValue(query)

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
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadBlogs()

    return () => {
      ignore = true
    }
  }, [])

  const categories = useMemo(
    () => ['All', ...new Set(blogs.map((blog) => blog.category))],
    [blogs],
  )

  const filteredBlogs = useMemo(
    () =>
      blogs.filter((blog) => {
        const matchesCategory =
          activeCategory === 'All' || blog.category === activeCategory
        const matchesQuery = `${blog.title} ${blog.excerpt}`
          .toLowerCase()
          .includes(deferredQuery.toLowerCase())

        return matchesCategory && matchesQuery
      }),
    [activeCategory, blogs, deferredQuery],
  )

  return (
    <>
      <Seo
        title="Blog"
        path="/blog"
        description="Read financial insights from I3CUBE on investing, insurance, market updates, and tax planning."
      />
      <PageHero
        eyebrow="Blog"
        title="Financial insights for clients who prefer clarity over noise."
        description="Browse practical perspectives on planning, wealth-building, insurance, and market behavior."
        primaryService="Tax Saving Strategy"
        backgroundImage={servicesBackground}
        fullWidth
      />

      <section className="section-shell section-space">
        <div className="glass-card rounded-[1.35rem] p-4 sm:rounded-[2rem] sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search insights"
              className="w-full rounded-full border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)] sm:px-5 sm:text-base lg:max-w-md"
            />
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:justify-end">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-2 md:gap-5">
            {filteredBlogs.map((blog) => (
              <article key={blog._id || blog.id} className="elevated-card rounded-[1.25rem] p-4 sm:rounded-[1.75rem] sm:p-6">
                <img
                  src={resolveImageUrl(blog.coverImage, fallbackImage)}
                  alt={blog.title}
                  className="mb-5 aspect-[16/9] w-full rounded-[1rem] object-cover"
                  onError={imageFallbackHandler(fallbackImage)}
                />
                <span className="label-chip">{blog.category}</span>
                <h2 className="text-display mt-4 text-[clamp(1.35rem,7vw,1.875rem)] font-semibold leading-tight text-slate-900 sm:mt-5">
                  {blog.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {blog.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
                  <span>{blog.readTime}</span>
                  <span>Premium insight</span>
                </div>
              </article>
            ))}
            {!loading && filteredBlogs.length === 0 ? (
              <div className="rounded-[1.25rem] border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 md:col-span-2">
                No blog articles found.
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogPage
