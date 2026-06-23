import api from '../services/api'

export function resolveImageUrl(imageUrl, fallbackImage) {
  const source = imageUrl?.trim()

  if (!source) {
    return fallbackImage
  }

  const isUploadPath = /^\/?uploads\//i.test(source)
  const isLegacyLocalUpload = /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?\/uploads\//i.test(source)

  if (isUploadPath || isLegacyLocalUpload) {
    const apiOrigin = new URL(api.defaults.baseURL).origin
    const uploadPath = isLegacyLocalUpload ? new URL(source).pathname : source
    return new URL(uploadPath.startsWith('/') ? uploadPath : `/${uploadPath}`, apiOrigin).toString()
  }

  if (/^https?:\/\//i.test(source)) {
    return source
  }

  return fallbackImage
}

export function imageFallbackHandler(fallbackImage) {
  return (event) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = fallbackImage
  }
}
