import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('i3cube-admin-token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export async function safeRequest(request, fallback) {
  try {
    const response = await request()
    return response.data
  } catch (error) {
    if (fallback !== undefined) {
      return fallback
    }

    throw error
  }
}

export default api
