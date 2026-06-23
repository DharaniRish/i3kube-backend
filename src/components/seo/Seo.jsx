import { Helmet } from 'react-helmet-async'
import { schemaBase, siteMeta } from '../../constants/siteData'

function Seo({ title, description, path = '/', image, schema }) {
  const canonical = `${siteMeta.siteUrl}${path}`
  const metaTitle = title ? `${title} | ${siteMeta.name}` : `${siteMeta.name} | ${siteMeta.tagline}`
  const metaDescription =
    description ||
    'Integrated investment, insurance, and income planning designed to build trust and long-term financial confidence.'
  const metaImage = image || `${siteMeta.siteUrl}/favicon.svg`
  const structuredData = schema || {
    ...schemaBase,
    url: canonical,
  }

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={metaImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <link rel="canonical" href={canonical} />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}

export default Seo
