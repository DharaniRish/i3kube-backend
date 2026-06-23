import { startTransition, useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FaArrowRightFromBracket,
  FaBars,
  FaBlog,
  FaBriefcase,
  FaBuildingShield,
  FaHandshake,
  FaInbox,
  FaRotate,
  FaStar,
  FaTrash,
  FaXmark,
} from 'react-icons/fa6'
import api, { safeRequest } from '../services/api'
import { resolveImageUrl } from '../utils/imageUrl'
import {
  partners as fallbackPartners,
  serviceCategories,
  testimonials as fallbackTestimonials,
} from '../constants/siteData'
import logo from '../assets/logo.png'

const fallbackServices = serviceCategories.map((service, index) => ({
  title: service.title,
  description: service.description,
  category: service.title,
  image: service.image,
  highlights: service.highlights,
  featured: true,
  sortOrder: index + 1,
}))

const modules = [
  { key: 'Overview', icon: FaBuildingShield },
  { key: 'Get in Touch', icon: FaInbox },
  { key: 'Blogs', icon: FaBlog },
  { key: 'Testimonials', icon: FaStar },
  { key: 'Services', icon: FaBriefcase },
  { key: 'Partners', icon: FaHandshake },
]

const leadFilters = [
  { label: 'All', shortLabel: 'All' },
  { label: 'New', shortLabel: 'New' },
  { label: 'Contacted', shortLabel: 'Contacted' },
  { label: 'Closed', shortLabel: 'Closed' },
  { label: 'Contact Forms', shortLabel: 'Forms' },
  { label: 'Modal Enquiries', shortLabel: 'Modal' },
]

const emptyBlog = {
  title: '',
  category: 'Investment Planning',
  excerpt: '',
  content: '',
  coverImage: '',
  readTime: '5 min read',
  published: true,
}

const emptyTestimonial = {
  name: '',
  role: '',
  quote: '',
  rating: 5,
  metric: '',
  avatar: '',
  featured: true,
}

const emptyService = {
  title: '',
  category: 'Advisory',
  description: '',
  image: '',
  highlights: '',
  featured: true,
  sortOrder: 0,
}

const emptyPartner = {
  name: '',
  category: 'Insurance',
  logo: '',
  website: '',
  featured: true,
}

function Field({ label, children, className = '' }) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="mb-2 block break-words text-xs font-bold uppercase tracking-[0.12em] text-slate-500 sm:tracking-[0.18em]">
        {label}
      </span>
      {children}
    </label>
  )
}

const inputClass =
  'min-w-0 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/12'

function PrimaryButton({ children, type = 'submit', onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex min-h-11 w-full min-w-0 items-center justify-center rounded-xl bg-[#061936] px-5 text-sm font-bold text-white transition hover:bg-[#0B2A57] sm:w-auto"
    >
      {children}
    </button>
  )
}

function GhostButton({ children, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex min-h-11 w-full min-w-0 items-center justify-center rounded-xl bg-slate-100 px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-200 sm:w-auto"
    >
      {children}
    </button>
  )
}

function DangerButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-10 w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 text-sm font-bold text-rose-700 transition hover:bg-rose-100 sm:w-auto"
    >
      <FaTrash aria-hidden="true" />
      {children}
    </button>
  )
}

function MetricCard({ label, value }) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-[var(--shadow-card)] sm:p-5">
      <p className="break-words text-xs font-bold uppercase tracking-[0.16em] text-slate-500 sm:tracking-[0.2em]">{label}</p>
      <p className="text-display mt-3 text-[clamp(1.75rem,7vw,1.875rem)] font-bold text-[#061936]">{value}</p>
    </div>
  )
}

async function fetchAdminData() {
  const [statsData, enquiryData, blogData, testimonialData, serviceData, partnerData] =
    await Promise.all([
      safeRequest(() => api.get('/admin/stats'), {}),
      safeRequest(() => api.get('/enquiry'), []),
      safeRequest(() => api.get('/blogs'), []),
      safeRequest(() => api.get('/testimonials'), fallbackTestimonials),
      safeRequest(() => api.get('/services'), fallbackServices),
      safeRequest(() => api.get('/partners'), fallbackPartners),
    ])

  return {
    statsData,
    enquiryData,
    blogData,
    testimonialData,
    serviceData,
    partnerData,
  }
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37] sm:tracking-[0.24em]">{eyebrow}</p>
        <h1 className="text-display mt-2 text-[clamp(1.55rem,7vw,1.875rem)] font-bold leading-tight text-[#061936]">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
    </div>
  )
}

function AdminDashboardPage() {
  const [activeModule, setActiveModule] = useState('Overview')
  const [adminMenuOpen, setAdminMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({})
  const [enquiries, setEnquiries] = useState([])
  const [blogs, setBlogs] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [services, setServices] = useState([])
  const [partners, setPartners] = useState([])
  const [leadFilter, setLeadFilter] = useState('All')
  const [editingBlogId, setEditingBlogId] = useState(null)
  const [editingTestimonialId, setEditingTestimonialId] = useState(null)
  const [editingServiceId, setEditingServiceId] = useState(null)
  const [editingPartnerId, setEditingPartnerId] = useState(null)
  const [blogImageUploading, setBlogImageUploading] = useState(false)
  const [testimonialImageUploading, setTestimonialImageUploading] = useState(false)

  const blogForm = useForm({ defaultValues: emptyBlog })
  const testimonialForm = useForm({ defaultValues: emptyTestimonial })
  const serviceForm = useForm({ defaultValues: emptyService })
  const partnerForm = useForm({ defaultValues: emptyPartner })
  const blogCoverImage = useWatch({
    control: blogForm.control,
    name: 'coverImage',
  })
  const testimonialAvatar = useWatch({
    control: testimonialForm.control,
    name: 'avatar',
  })

  const loadDashboard = async () => {
    setLoading(true)

    try {
      const {
        statsData,
        enquiryData,
        blogData,
        testimonialData,
        serviceData,
        partnerData,
      } = await fetchAdminData()

      setStats(statsData)
      setEnquiries(enquiryData)
      setBlogs(blogData)
      setTestimonials(testimonialData)
      setServices(serviceData)
      setPartners(partnerData)
    } catch {
      toast.error('Unable to load admin panel data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let ignore = false

    const initializeDashboard = async () => {
      try {
        const {
          statsData,
          enquiryData,
          blogData,
          testimonialData,
          serviceData,
          partnerData,
        } = await fetchAdminData()

        if (ignore) {
          return
        }

        setStats(statsData)
        setEnquiries(enquiryData)
        setBlogs(blogData)
        setTestimonials(testimonialData)
        setServices(serviceData)
        setPartners(partnerData)
      } catch {
        if (!ignore) {
          toast.error('Unable to load admin panel data.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    initializeDashboard()

    return () => {
      ignore = true
    }
  }, [])

  const dashboardMetrics = useMemo(
    () => [
      ['Total Enquiries', stats.totalEnquiries || enquiries.length],
      ['Contacted Leads', stats.contactedEnquiries || enquiries.filter((item) => item.status === 'Contacted').length],
      ['Blogs', stats.totalBlogs || blogs.length],
      ['Testimonials', stats.totalTestimonials || testimonials.length],
      ['Services', stats.totalServices || services.length],
      ['Partners', stats.totalPartners || partners.length],
    ],
    [blogs, enquiries, partners, services, stats, testimonials],
  )

  const filteredEnquiries = useMemo(() => {
    if (leadFilter === 'All') {
      return enquiries
    }

    if (leadFilter === 'Contact Forms') {
      return enquiries.filter((item) => item.source === 'contact-form')
    }

    if (leadFilter === 'Modal Enquiries') {
      return enquiries.filter((item) => item.source === 'modal')
    }

    return enquiries.filter((item) => item.status === leadFilter)
  }, [enquiries, leadFilter])

  const logout = () => {
    localStorage.removeItem('i3cube-admin-token')
    window.location.href = '/admin/login'
  }

  const updateEnquiryStatus = async (id, status) => {
    try {
      const response = await api.put(`/enquiry/${id}`, { status })
      setEnquiries((current) => current.map((item) => (item._id === id ? response.data : item)))
      toast.success(`Enquiry marked as ${status.toLowerCase()}.`)
    } catch {
      toast.error('Unable to update enquiry.')
    }
  }

  const deleteEnquiry = async (id) => {
    try {
      await api.delete(`/enquiry/${id}`)
      setEnquiries((current) => current.filter((item) => item._id !== id))
      toast.success('Enquiry deleted.')
    } catch {
      toast.error('Unable to delete enquiry.')
    }
  }

  const uploadBlogCoverImage = async (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('image', file)
    setBlogImageUploading(true)

    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const coverImageUrl = new URL(response.data.url, api.defaults.baseURL).toString()

      blogForm.setValue('coverImage', coverImageUrl, {
        shouldDirty: true,
        shouldValidate: true,
      })
      toast.success('Blog image uploaded.')
    } catch {
      toast.error('Unable to upload blog image.')
    } finally {
      setBlogImageUploading(false)
      event.target.value = ''
    }
  }

  const uploadTestimonialAvatar = async (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('image', file)
    setTestimonialImageUploading(true)

    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const avatarUrl = new URL(response.data.url, api.defaults.baseURL).toString()

      testimonialForm.setValue('avatar', avatarUrl, {
        shouldDirty: true,
        shouldValidate: true,
      })
      toast.success('Testimonial avatar uploaded.')
    } catch {
      toast.error('Unable to upload testimonial avatar.')
    } finally {
      setTestimonialImageUploading(false)
      event.target.value = ''
    }
  }

  const saveBlog = async (values) => {
    if (blogImageUploading) {
      toast.error('Please wait for the blog image upload to finish.')
      return
    }

    try {
      if (editingBlogId) {
        const response = await api.put(`/blogs/${editingBlogId}`, values)
        setBlogs((current) => current.map((item) => (item._id === editingBlogId ? response.data : item)))
        toast.success('Blog updated.')
      } else {
        const response = await api.post('/blogs', values)
        setBlogs((current) => [response.data, ...current])
        toast.success('Blog created.')
      }

      setEditingBlogId(null)
      blogForm.reset(emptyBlog)
    } catch {
      toast.error('Unable to save blog.')
    }
  }

  const saveTestimonial = async (values) => {
    if (testimonialImageUploading) {
      toast.error('Please wait for the testimonial avatar upload to finish.')
      return
    }

    try {
      const payload = { ...values, rating: Number(values.rating || 5) }

      if (editingTestimonialId) {
        const response = await api.put(`/testimonials/${editingTestimonialId}`, payload)
        setTestimonials((current) =>
          current.map((item) => (item._id === editingTestimonialId ? response.data : item)),
        )
        toast.success('Testimonial updated.')
      } else {
        const response = await api.post('/testimonials', payload)
        setTestimonials((current) => [response.data, ...current])
        toast.success('Testimonial added.')
      }

      setEditingTestimonialId(null)
      testimonialForm.reset(emptyTestimonial)
    } catch {
      toast.error('Unable to save testimonial.')
    }
  }

  const saveService = async (values) => {
    try {
      const payload = {
        ...values,
        sortOrder: Number(values.sortOrder || 0),
        highlights: String(values.highlights || '')
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
      }

      if (editingServiceId) {
        const response = await api.put(`/services/${editingServiceId}`, payload)
        setServices((current) =>
          current.map((item) => (item._id === editingServiceId ? response.data : item)),
        )
        toast.success('Service updated.')
      } else {
        const response = await api.post('/services', payload)
        setServices((current) => [response.data, ...current])
        toast.success('Service added.')
      }

      setEditingServiceId(null)
      serviceForm.reset(emptyService)
    } catch {
      toast.error('Unable to save service.')
    }
  }

  const savePartner = async (values) => {
    try {
      if (editingPartnerId) {
        const response = await api.put(`/partners/${editingPartnerId}`, values)
        setPartners((current) =>
          current.map((item) => (item._id === editingPartnerId ? response.data : item)),
        )
        toast.success('Partner updated.')
      } else {
        const response = await api.post('/partners', values)
        setPartners((current) => [response.data, ...current])
        toast.success('Partner added.')
      }

      setEditingPartnerId(null)
      partnerForm.reset(emptyPartner)
    } catch {
      toast.error('Unable to save partner.')
    }
  }

  const deleteResource = async (resource, id, setter) => {
    try {
      await api.delete(`/${resource}/${id}`)
      setter((current) => current.filter((item) => item._id !== id))
      toast.success('Item deleted.')
    } catch {
      toast.error('Unable to delete item.')
    }
  }

  const beginEdit = (type, item) => {
    startTransition(() => {
      if (type === 'blog') {
        setEditingBlogId(item._id)
        blogForm.reset(item)
        setActiveModule('Blogs')
      }

      if (type === 'testimonial') {
        setEditingTestimonialId(item._id)
        testimonialForm.reset(item)
        setActiveModule('Testimonials')
      }

      if (type === 'service') {
        setEditingServiceId(item._id)
        serviceForm.reset({
          ...item,
          highlights: Array.isArray(item.highlights) ? item.highlights.join('\n') : item.highlights,
        })
        setActiveModule('Services')
      }

      if (type === 'partner') {
        setEditingPartnerId(item._id)
        partnerForm.reset(item)
        setActiveModule('Partners')
      }
    })
  }

  const closeBlogEditor = () => {
    setEditingBlogId(null)
    blogForm.reset(emptyBlog)
  }

  const blogFormFields = (
    <>
      <Field label="Title"><input className={inputClass} {...blogForm.register('title', { required: true })} /></Field>
      <Field label="Category"><input className={inputClass} {...blogForm.register('category', { required: true })} /></Field>
      <Field label="Read Time"><input className={inputClass} {...blogForm.register('readTime')} /></Field>
      <Field label="Cover Image">
        <input type="hidden" {...blogForm.register('coverImage')} />
        <input
          type="file"
          accept="image/*"
          onChange={uploadBlogCoverImage}
          disabled={blogImageUploading}
          className={`${inputClass} file:mr-4 file:rounded-lg file:border-0 file:bg-[#061936] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white disabled:cursor-not-allowed disabled:opacity-60`}
        />
        {blogImageUploading ? (
          <p className="mt-2 text-sm font-semibold text-slate-500">Uploading image...</p>
        ) : null}
        {blogCoverImage ? (
          <img
            src={resolveImageUrl(blogCoverImage, '')}
            alt="Blog cover preview"
            className="mt-3 aspect-[16/9] w-full rounded-xl border border-slate-200 object-cover"
          />
        ) : null}
      </Field>
      <Field label="Excerpt" className="md:col-span-2"><textarea className={inputClass} rows="3" {...blogForm.register('excerpt', { required: true })} /></Field>
      <Field label="Content" className="md:col-span-2"><textarea className={inputClass} rows="5" {...blogForm.register('content', { required: true })} /></Field>
    </>
  )

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="rounded-2xl bg-white p-8 text-center shadow-[var(--shadow-soft)]">
          <div className="mx-auto size-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#061936]" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
            Loading Admin Panel
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 px-2 py-3 text-white sm:px-5 sm:py-5">
      <div className="grid min-w-0 gap-4 lg:min-h-[calc(100vh-2.5rem)] lg:grid-cols-[17rem_minmax(0,1fr)] 2xl:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#061936] p-3 sm:p-5 lg:sticky lg:top-5 lg:max-h-[calc(100vh-2.5rem)] lg:self-start lg:overflow-y-auto">
          <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/8 p-3 sm:p-4 lg:block">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={logo}
                alt="I3CUBE"
                className="size-10 shrink-0 rounded-xl bg-white object-contain p-1 shadow-lg sm:size-12"
              />
              <div className="min-w-0">
                <p className="text-display truncate text-[1.15rem] font-bold leading-tight sm:text-2xl lg:whitespace-normal">I3CUBE Admin</p>
                <p className="hidden text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#D4AF37] sm:block">
                  Invest Insure Income
                </p>
              </div>
            </div>
            <div className="hidden min-w-0 lg:block">
              <p className="mt-2 hidden max-w-full break-words text-sm leading-6 text-white/70 sm:block xl:max-w-none">
                Manage leads, content, services, testimonials, and partner data.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAdminMenuOpen((current) => !current)}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/15 text-white transition hover:bg-white/8 lg:hidden"
              aria-label={adminMenuOpen ? 'Close admin menu' : 'Open admin menu'}
              aria-expanded={adminMenuOpen}
            >
              {adminMenuOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </button>
          </div>

          <nav className={`${adminMenuOpen ? 'grid' : 'hidden'} mt-3 min-w-0 max-w-full gap-2 lg:mt-5 lg:block lg:space-y-2`}>
            {modules.map((module) => {
              const Icon = module.icon

              return (
                <button
                  key={module.key}
                  type="button"
                  onClick={() => {
                    setActiveModule(module.key)
                    setAdminMenuOpen(false)
                  }}
                  className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-bold transition ${
                    activeModule === module.key
                      ? 'bg-white text-[#061936]'
                      : 'bg-white/6 text-white/78 hover:bg-white/10'
                  }`}
                >
                  <Icon aria-hidden="true" />
                  {module.key}
                </button>
              )
            })}
          </nav>

          <button
            type="button"
            onClick={logout}
            className={`${adminMenuOpen ? 'flex' : 'hidden'} mt-3 min-h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/15 text-sm font-bold text-white/88 transition hover:bg-white/8 lg:mt-5 lg:flex`}
          >
            <FaArrowRightFromBracket aria-hidden="true" />
            Logout
          </button>
        </aside>

        <main className="min-w-0 overflow-hidden rounded-2xl bg-slate-50 p-3 text-slate-900 sm:p-5 lg:min-h-[calc(100vh-2.5rem)] lg:p-6 xl:p-8">
          {activeModule === 'Overview' ? (
            <section>
              <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <SectionHeader
                  eyebrow="Dashboard"
                  title="Admin control panel"
                  description="A single workspace for website enquiries, blog articles, testimonials, services, and partner records."
                />
                <GhostButton onClick={loadDashboard}>
                  <span className="inline-flex items-center gap-2">
                    <FaRotate aria-hidden="true" />
                    Refresh
                  </span>
                </GhostButton>
              </div>
              <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2 lg:gap-4 2xl:grid-cols-3">
                {dashboardMetrics.map(([label, value]) => (
                  <MetricCard key={label} label={label} value={value} />
                ))}
              </div>
            </section>
          ) : null}

          {activeModule === 'Get in Touch' ? (
            <section>
              <SectionHeader
                eyebrow="Enquiries"
                title="Get in Touch and enquiry leads"
                description="Track contact form submissions, modal enquiries, and service-specific lead requests."
              />

              <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {leadFilters.map((filter) => (
                  <button
                    key={filter.label}
                    type="button"
                    onClick={() => setLeadFilter(filter.label)}
                    className={`min-h-10 min-w-0 rounded-full px-3 py-2 text-sm font-bold ${
                      leadFilter === filter.label ? 'bg-[#061936] text-white' : 'bg-white text-slate-600'
                    }`}
                  >
                    <span className="sm:hidden">{filter.shortLabel}</span>
                    <span className="hidden sm:inline">{filter.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 grid gap-3 lg:hidden">
                {filteredEnquiries.map((item) => (
                  <article key={item._id} className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[var(--shadow-card)]">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="break-words font-bold text-[#061936]">{item.name}</p>
                        <p className="mt-1 break-words text-sm text-slate-500">{item.email}</p>
                        <p className="mt-1 break-words text-sm text-slate-700">{item.phone}</p>
                      </div>
                      <span className="w-fit shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-3 break-words rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">
                      {item.message}
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-slate-600">
                      <p className="break-words"><span className="font-bold text-[#061936]">Service:</span> {item.service}</p>
                    </div>
                    <div className="mt-4 grid gap-2 sm:flex sm:flex-wrap">
                      <GhostButton onClick={() => updateEnquiryStatus(item._id, 'Contacted')}>
                        Contacted
                      </GhostButton>
                      <GhostButton onClick={() => updateEnquiryStatus(item._id, 'Closed')}>
                        Closed
                      </GhostButton>
                      <DangerButton onClick={() => deleteEnquiry(item._id)}>Delete</DangerButton>
                    </div>
                  </article>
                ))}
                {filteredEnquiries.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
                    No enquiries found.
                  </div>
                ) : null}
              </div>

              <div className="finance-scrollbar mt-5 hidden overflow-auto rounded-2xl border border-slate-200 bg-white lg:block">
                <table className="w-full min-w-[52rem] text-left text-sm xl:min-w-[56rem]">
                  <thead className="bg-slate-100 text-xs uppercase tracking-[0.16em] text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Lead</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3">Service</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.map((item) => (
                      <tr key={item._id}>
                        <td className="px-4 py-4 align-top">
                          <p className="font-bold text-[#061936]">{item.name}</p>
                          <p className="mt-1 max-w-xs text-slate-600">{item.message}</p>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <p>{item.phone}</p>
                          <p className="mt-1 text-slate-500">{item.email}</p>
                        </td>
                        <td className="px-4 py-4 align-top">{item.service}</td>
                        <td className="px-4 py-4 align-top">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <div className="flex flex-wrap gap-2">
                            <GhostButton onClick={() => updateEnquiryStatus(item._id, 'Contacted')}>
                              Contacted
                            </GhostButton>
                            <GhostButton onClick={() => updateEnquiryStatus(item._id, 'Closed')}>
                              Closed
                            </GhostButton>
                            <DangerButton onClick={() => deleteEnquiry(item._id)}>Delete</DangerButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td className="px-4 py-8 text-center text-slate-500" colSpan="5">
                          No enquiries found.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {activeModule === 'Blogs' ? (
            <CrudSection
              title="Blog manager"
              description="Create and maintain Blog & Insights articles."
              editing={false}
              hideForm={Boolean(editingBlogId)}
              onReset={() => {
                blogForm.reset(emptyBlog)
              }}
              onSubmit={blogForm.handleSubmit(saveBlog)}
              submitLabel="Create Blog"
              form={blogFormFields}
              list={blogs.map((item) => (
                <ContentCard
                  key={item._id || item.id}
                  title={item.title}
                  meta={`${item.category} - ${item.readTime || '5 min read'}`}
                  body={item.excerpt}
                  image={item.coverImage}
                  onEdit={item._id ? () => beginEdit('blog', item) : null}
                  onDelete={item._id ? () => deleteResource('blogs', item._id, setBlogs) : null}
                />
              ))}
            />
          ) : null}

          {activeModule === 'Testimonials' ? (
            <CrudSection
              title="Testimonials manager"
              description="Add client stories, metrics, roles, and profile images."
              editing={editingTestimonialId}
              onReset={() => {
                setEditingTestimonialId(null)
                testimonialForm.reset(emptyTestimonial)
              }}
              onSubmit={testimonialForm.handleSubmit(saveTestimonial)}
              submitLabel={editingTestimonialId ? 'Update Testimonial' : 'Add Testimonial'}
              form={
                <>
                  <Field label="Client Name"><input className={inputClass} {...testimonialForm.register('name', { required: true })} /></Field>
                  <Field label="Role"><input className={inputClass} {...testimonialForm.register('role', { required: true })} /></Field>
                  <Field label="Rating"><input type="number" min="1" max="5" className={inputClass} {...testimonialForm.register('rating')} /></Field>
                  <Field label="Metric"><input className={inputClass} {...testimonialForm.register('metric')} /></Field>
                  <Field label="Avatar Image">
                    <input type="hidden" {...testimonialForm.register('avatar')} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={uploadTestimonialAvatar}
                      disabled={testimonialImageUploading}
                      className={`${inputClass} file:mr-4 file:rounded-lg file:border-0 file:bg-[#061936] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white disabled:cursor-not-allowed disabled:opacity-60`}
                    />
                    {testimonialImageUploading ? (
                      <p className="mt-2 text-sm font-semibold text-slate-500">Uploading avatar...</p>
                    ) : null}
                    {testimonialAvatar ? (
                      <img
                        src={testimonialAvatar}
                        alt="Testimonial avatar preview"
                        className="mt-3 size-24 rounded-xl border border-slate-200 object-cover"
                      />
                    ) : null}
                  </Field>
                  <Field label="Quote" className="md:col-span-2"><textarea className={inputClass} rows="4" {...testimonialForm.register('quote', { required: true })} /></Field>
                </>
              }
              list={testimonials.map((item) => (
                <ContentCard
                  key={item._id || item.name}
                  title={item.name}
                  meta={item.role}
                  body={item.quote}
                  image={item.avatar}
                  onEdit={item._id ? () => beginEdit('testimonial', item) : null}
                  onDelete={item._id ? () => deleteResource('testimonials', item._id, setTestimonials) : null}
                />
              ))}
            />
          ) : null}

          {activeModule === 'Services' ? (
            <CrudSection
              title="Services manager"
              description="Manage the services shown on the website and used by enquiry flows."
              editing={editingServiceId}
              onReset={() => {
                setEditingServiceId(null)
                serviceForm.reset(emptyService)
              }}
              onSubmit={serviceForm.handleSubmit(saveService)}
              submitLabel={editingServiceId ? 'Update Service' : 'Add Service'}
              form={
                <>
                  <Field label="Service Title"><input className={inputClass} {...serviceForm.register('title', { required: true })} /></Field>
                  <Field label="Category"><input className={inputClass} {...serviceForm.register('category')} /></Field>
                  <Field label="Sort Order"><input type="number" className={inputClass} {...serviceForm.register('sortOrder')} /></Field>
                  <Field label="Image URL"><input className={inputClass} {...serviceForm.register('image')} /></Field>
                  <Field label="Description" className="md:col-span-2"><textarea className={inputClass} rows="3" {...serviceForm.register('description', { required: true })} /></Field>
                  <Field label="Highlights, one per line" className="md:col-span-2"><textarea className={inputClass} rows="5" {...serviceForm.register('highlights')} /></Field>
                </>
              }
              list={services.map((item) => (
                <ContentCard
                  key={item._id || item.title}
                  title={item.title}
                  meta={item.category}
                  body={`${item.description} ${Array.isArray(item.highlights) && item.highlights.length ? `Highlights: ${item.highlights.join(', ')}` : ''}`}
                  image={item.image}
                  onEdit={item._id ? () => beginEdit('service', item) : null}
                  onDelete={item._id ? () => deleteResource('services', item._id, setServices) : null}
                />
              ))}
            />
          ) : null}

          {activeModule === 'Partners' ? (
            <CrudSection
              title="Partners manager"
              description="Manage partner logos, categories, and website links."
              editing={editingPartnerId}
              onReset={() => {
                setEditingPartnerId(null)
                partnerForm.reset(emptyPartner)
              }}
              onSubmit={partnerForm.handleSubmit(savePartner)}
              submitLabel={editingPartnerId ? 'Update Partner' : 'Add Partner'}
              form={
                <>
                  <Field label="Partner Name"><input className={inputClass} {...partnerForm.register('name', { required: true })} /></Field>
                  <Field label="Category"><input className={inputClass} {...partnerForm.register('category', { required: true })} /></Field>
                  <Field label="Logo URL"><input className={inputClass} {...partnerForm.register('logo', { required: true })} /></Field>
                  <Field label="Website"><input className={inputClass} {...partnerForm.register('website')} /></Field>
                </>
              }
              list={partners.map((item) => (
                <ContentCard
                  key={item._id || item.name}
                  title={item.name}
                  meta={item.category}
                  body={item.website || 'No website URL added.'}
                  image={item.logo}
                  onEdit={item._id ? () => beginEdit('partner', item) : null}
                  onDelete={item._id ? () => deleteResource('partners', item._id, setPartners) : null}
                />
              ))}
            />
          ) : null}
        </main>
      </div>

      {editingBlogId ? (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/70 p-3 text-slate-900 backdrop-blur-sm sm:p-6">
          <div className="mx-auto min-h-full w-full max-w-4xl py-4 sm:py-8">
            <form
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-6"
              onSubmit={blogForm.handleSubmit(saveBlog)}
            >
              <div className="flex min-w-0 items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                    Edit Blog
                  </p>
                  <h2 className="text-display mt-2 break-words text-2xl font-bold text-[#061936]">
                    Update blog article
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeBlogEditor}
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                  aria-label="Close blog editor"
                >
                  <FaXmark aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">{blogFormFields}</div>

              <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:justify-end">
                <GhostButton onClick={closeBlogEditor}>Cancel</GhostButton>
                <PrimaryButton>Update Blog</PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function CrudSection({
  title,
  description,
  editing,
  onReset,
  onSubmit,
  submitLabel,
  form,
  list,
  hideForm = false,
}) {
  return (
    <section>
      <SectionHeader eyebrow={editing ? 'Editing' : 'Content'} title={title} description={description} />
      {!hideForm ? (
        <form className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-[var(--shadow-card)] sm:p-5" onSubmit={onSubmit}>
          <div className="grid gap-4 md:grid-cols-2">{form}</div>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
            <PrimaryButton>{submitLabel}</PrimaryButton>
            <GhostButton onClick={onReset}>Reset</GhostButton>
          </div>
        </form>
      ) : null}

      <div className="mt-5 grid gap-4 2xl:grid-cols-2">{list}</div>
    </section>
  )
}

function ContentCard({ title, meta, body, image, onEdit, onDelete }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[var(--shadow-card)]">
      <div className="flex flex-col gap-4 sm:flex-row">
        {image ? (
          <img src={image} alt={title} className="h-40 w-full rounded-xl object-cover sm:size-20 sm:shrink-0" />
        ) : (
          <div className="flex h-28 w-full items-center justify-center rounded-xl bg-slate-100 text-xs font-bold uppercase tracking-[0.12em] text-slate-400 sm:size-20 sm:shrink-0">
            No Image
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-display break-words text-lg font-bold leading-snug text-[#061936] sm:text-xl">{title}</h3>
          <p className="mt-1 break-words text-sm font-semibold text-slate-500">{meta}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{body}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-2 sm:flex sm:flex-wrap">
        {onEdit ? <GhostButton onClick={onEdit}>Edit</GhostButton> : null}
        {onDelete ? <DangerButton onClick={onDelete}>Delete</DangerButton> : null}
        {!onEdit && !onDelete ? (
          <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">
            Static fallback item
          </span>
        ) : null}
      </div>
    </article>
  )
}

export default AdminDashboardPage
