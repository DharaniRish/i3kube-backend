import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import api from '../services/api'

function AdminLoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'admin@i3cube.in',
      password: 'Admin@123',
    },
  })

  const onSubmit = async (values) => {
    setLoading(true)

    try {
      const response = await api.post('/admin/login', values)
      localStorage.setItem('i3cube-admin-token', response.data.token)
      toast.success('Admin login successful.')
      navigate('/admin/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Seo title="Admin Login" path="/admin/login" />
      <section className="section-shell flex min-h-screen items-center justify-center py-28">
        <div className="glass-card w-full max-w-lg p-8 sm:p-10">
          <span className="label-chip">Admin Panel</span>
          <h1 className="text-display mt-5 text-4xl font-bold text-slate-900">Secure access for team operations.</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Use your admin credentials to manage enquiries, content, partners, testimonials, and calculator defaults.
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[var(--color-primary)]"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email ? <p className="mt-2 text-sm text-rose-600">{errors.email.message}</p> : null}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[var(--color-primary)]"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password ? (
                <p className="mt-2 text-sm text-rose-600">{errors.password.message}</p>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default AdminLoginPage
