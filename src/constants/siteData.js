import {
  FaArrowTrendUp,
  FaBriefcase,
  FaBuildingShield,
  FaChartPie,
  FaCheck,
  FaCoins,
  FaFileContract,
  FaHandshake,
  FaHouseChimney,
  FaLayerGroup,
  FaPersonCircleCheck,
  FaShieldHeart,
  FaUmbrella,
} from 'react-icons/fa6'
import hdfcLifeLogo from '../assets/partners/hdfc-life.svg'
import iciciPrudentialLogo from '../assets/partners/icici-prudential.svg'
import licLogo from '../assets/partners/lic.svg'
import sbiLifeLogo from '../assets/partners/sbi-life.svg'
import nipponIndiaLogo from '../assets/partners/nippon-india.svg'
import adityaBirlaLogo from '../assets/partners/aditya-birla.svg'
import axisMfLogo from '../assets/partners/axis-mf.svg'
import kotakLogo from '../assets/partners/kotak.svg'
import anikaAvatar from '../assets/testimonials/anika.svg'
import rahulAvatar from '../assets/testimonials/rahul.svg'
import meeraAvatar from '../assets/testimonials/meera.svg'

export const siteMeta = {
  name: 'I3CUBE',
  tagline: 'Invest • Insure • Income',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://www.i3cube.in',
}

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Services', to: '/services' },
  { label: 'Financial Calculators', to: '/#financial-calculators' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/#contact' },
]

export const trustIndicators = [
  'Trusted Financial Advisors',
  'Personalized Planning',
  'Wealth Creation',
  'Insurance Protection',
]

export const stats = [
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 100, prefix: '₹', suffix: ' Cr+', label: 'Assets Guided' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Customer Satisfaction' },
]

export const differentiators = [
  {
    title: 'Expert Guidance',
    description: 'Seasoned planners blending market insight with long-term wealth discipline.',
    icon: FaPersonCircleCheck,
  },
  {
    title: 'Customized Financial Planning',
    description: 'Every strategy is tuned to your risk appetite, cash flow, and milestones.',
    icon: FaLayerGroup,
  },
  {
    title: 'Transparent Advice',
    description: 'Clear recommendations, simple documentation, and fee-first communication.',
    icon: FaFileContract,
  },
  {
    title: 'Trusted Partners',
    description: 'Access to established insurers, lenders, and wealth institutions chosen for reliability.',
    icon: FaHandshake,
  },
  {
    title: 'Lifetime Support',
    description: 'Periodic reviews and rebalancing to keep your plan aligned with life changes.',
    icon: FaBriefcase,
  },
  {
    title: 'Risk Assessment',
    description: 'Protection-first structuring to guard income, assets, and family obligations.',
    icon: FaBuildingShield,
  },
]

export const heroImage =
  'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80'

export const aboutPreview = {
  image:
    'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
  story:
    'I3CUBE was built to help individuals, families, and business owners make confident financial decisions through one integrated advisory relationship.',
  vision:
    'To become a trusted long-term financial partner known for clarity, professionalism, and disciplined wealth guidance.',
  mission:
    'To simplify investments, insurance, loans, and financial planning through transparent advice tailored to each client’s goals.',
  trustPoints: [
    'Structured discovery and risk profiling',
    'Institution-grade partner network',
    'Long-term service and review commitment',
  ],
}

export const quickServices = [
  'Mutual Funds',
  'SIP',
  'Insurance',
  'Loans',
  'Tax Saving',
  'Retirement',
]

export const serviceCategories = [
  {
    title: 'Investments',
    description: 'Thoughtful investing frameworks for growth, stability, and tax efficiency.',
    icon: FaArrowTrendUp,
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Mutual Funds',
      'SIP Planning',
      'Retirement Planning',
      'Tax Saving Investments',
    ],
    accent: 'from-[#0B3C5D] to-[#124E78]',
  },
  {
    title: 'Insurance',
    description: 'Protection-led recommendations covering life stages, health, and dependents.',
    icon: FaShieldHeart,
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Life Insurance',
      'Health Insurance',
      'Term Plans',
      'Child Education Plans',
    ],
    accent: 'from-[#0F766E] to-[#14B8A6]',
  },
  {
    title: 'Financial Planning',
    description: 'Roadmaps for wealth creation, retirement confidence, and estate continuity.',
    icon: FaCoins,
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Goal-based Planning',
      'Wealth Creation',
      'Retirement Planning',
      'Estate Planning',
    ],
    accent: 'from-[#1E293B] to-[#0B3C5D]',
  },
  {
    title: 'Loans',
    description: 'Smart lending guidance that protects liquidity while supporting life goals.',
    icon: FaHouseChimney,
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Home Loans',
      'Personal Loans',
      'Business Loans',
      'Loan Against Property',
    ],
    accent: 'from-[#F59E0B] to-[#FB923C]',
  },
  {
    title: 'Retirement Planning',
    description: 'Retirement strategies designed for income continuity, inflation resilience, and peace of mind.',
    icon: FaChartPie,
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Retirement Planning',
      'Pension Structuring',
      'Income Planning',
      'Corpus Review',
    ],
    accent: 'from-[#003366] to-[#005AA7]',
  },
  {
    title: 'Tax Saving',
    description: 'Efficient structures that align tax-saving decisions with long-term wealth creation.',
    icon: FaUmbrella,
    image:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Tax Saving Investments',
      'Section Planning',
      'Annual Review',
      'Wealth-linked Tax Strategy',
    ],
    accent: 'from-[#0B1F33] to-[#003366]',
  },
]

export const processSteps = [
  'Book Consultation',
  'Financial Analysis',
  'Personalized Strategy',
  'Documentation',
  'Achieve Financial Goals',
]

export const partners = [
  { name: 'HDFC Life', logo: hdfcLifeLogo, category: 'Insurance' },
  { name: 'ICICI Prudential', logo: iciciPrudentialLogo, category: 'Insurance' },
  { name: 'LIC', logo: licLogo, category: 'Insurance' },
  { name: 'SBI Life', logo: sbiLifeLogo, category: 'Insurance' },
  { name: 'Nippon India', logo: nipponIndiaLogo, category: 'Mutual Fund' },
  { name: 'Aditya Birla Sun Life', logo: adityaBirlaLogo, category: 'Insurance' },
  { name: 'Axis Mutual Fund', logo: axisMfLogo, category: 'Mutual Fund' },
  { name: 'Kotak', logo: kotakLogo, category: 'Banking & Wealth' },
]

export const testimonials = [
  {
    name: 'Anika George',
    role: 'Founder, Meridian Foods',
    quote:
      'I3CUBE moved us from fragmented investments to a structured wealth and protection strategy. The confidence we have now is enormous.',
    rating: 5,
    metric: '32% better cash flow confidence',
    avatar: anikaAvatar,
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Rahul Khanna',
    role: 'Technology Consultant',
    quote:
      'Their retirement and insurance planning felt deeply personal, not product-led. Every recommendation came with clarity and context.',
    rating: 5,
    metric: 'Retirement corpus roadmap in 14 days',
    avatar: rahulAvatar,
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Meera Seshadri',
    role: 'Director, Family Office',
    quote:
      'The team balances sophistication with simplicity. Reviews are sharp, transparent, and always anchored to our long-term priorities.',
    rating: 5,
    metric: '₹4.8 Cr family asset alignment',
    avatar: meeraAvatar,
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80',
  },
]

export const blogs = [
  {
    id: 1,
    category: 'Investment Tips',
    title: 'How SIPs Build Discipline During Volatile Markets',
    excerpt:
      'Learn why systematic investing can reduce emotional decision-making and improve long-term compounding outcomes.',
    readTime: '5 min read',
  },
  {
    id: 2,
    category: 'Insurance',
    title: 'Protection Gaps Every Young Family Should Close Early',
    excerpt:
      'A practical framework for life cover, health cover, and emergency reserves before lifestyle inflation kicks in.',
    readTime: '6 min read',
  },
  {
    id: 3,
    category: 'Market Updates',
    title: 'What Interest Rate Cycles Mean for Debt and Equity Allocation',
    excerpt:
      'Understand how changing rates influence asset allocation and the role of rebalancing in uncertain environments.',
    readTime: '7 min read',
  },
  {
    id: 4,
    category: 'Tax Planning',
    title: 'Smart Tax Moves to Make Before the Financial Year Ends',
    excerpt:
      'A checklist of tax-saving actions spanning deductions, capital gains planning, and insurance-linked decisions.',
    readTime: '4 min read',
  },
]

export const faqs = [
  {
    question: 'Who should work with I3CUBE?',
    answer:
      'Individuals, families, founders, and businesses looking for integrated guidance across investments, insurance, lending, and financial planning.',
  },
  {
    question: 'Do you offer personalized financial plans?',
    answer:
      'Yes. Every engagement starts with a discovery process so recommendations are aligned to your income, goals, liabilities, and risk appetite.',
  },
  {
    question: 'Can I review my existing policies and investments with you?',
    answer:
      'Absolutely. We frequently audit portfolios and cover plans already in place before suggesting any new direction.',
  },
  {
    question: 'How quickly can I get started?',
    answer:
      'Most clients book a consultation within a few days and receive an initial strategy outline shortly after the first assessment.',
  },
]

export const officeDetails = {
  address: 'No. 85, Sarathy Nagar, Kagithapatarai, Vellore, Tamil Nadu 632012',
  phone: '+91 81898 22888',
  email: 'hello@i3cube.in',
  whatsapp: '+918189822888',
  mapsUrl:
    'https://www.google.com/maps?q=No.+85,+Sarathy+Nagar,+Kagithapatarai,+Vellore,+Tamil+Nadu+632012&output=embed',
}

export const contactHighlights = [
  { label: 'Investments', icon: FaArrowTrendUp },
  { label: 'Insurance', icon: FaUmbrella },
  { label: 'Financial Planning', icon: FaBriefcase },
]

export const serviceOptions = [
  'Investments',
  'Mutual Funds',
  'SIP Planning',
  'Retirement Planning',
  'Tax Saving Investments',
  'Insurance',
  'Life Insurance',
  'Health Insurance',
  'Term Plans',
  'Child Education Plans',
  'Financial Planning',
  'Goal-based Planning',
  'Wealth Creation',
  'Estate Planning',
  'Loans',
  'Home Loans',
  'Personal Loans',
  'Business Loans',
  'Loan Against Property',
]

export const schemaBase = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'I3CUBE',
  description:
    'Premium financial consulting for investments, insurance, loans, and long-term wealth planning.',
  telephone: officeDetails.phone,
  email: officeDetails.email,
  areaServed: 'India',
}

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'YouTube', href: 'https://www.youtube.com/' },
]

export const trustChecklist = [
  'Trusted financial advisors',
  'Personalized planning journey',
  'Strong protection-first thinking',
  'Conversion-focused consultation support',
]

export const quickMetrics = [
  { label: 'Clients guided', value: '500+' },
  { label: 'Assets mapped', value: '₹100 Cr+' },
  { label: 'Review satisfaction', value: '98%' },
]

export const checklistIcon = FaCheck
