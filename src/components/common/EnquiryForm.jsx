import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import api from '../../services/api'
import { serviceOptions } from '../../constants/siteData'

function EnquiryForm({
  defaultService = 'Financial Planning',
  title = 'Let’s build your next financial move.',
  description = 'Tell us a little about your goals and we’ll reach out with a tailored next step.',
  onSuccess,
  compact = false,
}) {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)
  const location = useLocation()
  const selectedService = serviceOptions.includes(defaultService)
    ? defaultService
    : 'Financial Planning'
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      service: selectedService,
    },
  })

  const fieldClassName = useMemo(
    () =>
      'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[rgba(11,60,93,0.08)]',
    [],
  )

  const onSubmit = async (values) => {
    setIsSubmittingForm(true)

    try {
      await api.post('/enquiry', {
        ...values,
        page: location.pathname,
        source: compact ? 'modal' : 'contact-form',
      })
      toast.success('Enquiry submitted successfully.')
      reset({ name: '', phone: '', email: '', service: selectedService, message: '' })
      onSuccess?.()
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Unable to submit your enquiry right now.',
      )
    } finally {
      setIsSubmittingForm(false)
    }
  }

  return (
    <div className={`glass-card ${compact ? 'p-6' : 'p-7 sm:p-9'}`}>
      <h3 className="text-display text-2xl font-bold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

      <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className={fieldClassName}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name ? (
              <p className="mt-2 text-sm text-rose-600">{errors.name.message}</p>
            ) : null}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              className={fieldClassName}
              {...register('phone', {
                required: 'Phone number is required',
                minLength: { value: 10, message: 'Enter a valid phone number' },
              })}
            />
            {errors.phone ? (
              <p className="mt-2 text-sm text-rose-600">{errors.phone.message}</p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className={fieldClassName}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email ? (
              <p className="mt-2 text-sm text-rose-600">{errors.email.message}</p>
            ) : null}
          </div>
          <div>
            <select className={fieldClassName} {...register('service', { required: true })}>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <textarea
            rows="5"
            placeholder="Tell us about your financial goals"
            className={`${fieldClassName} block min-h-36 resize-y leading-6`}
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message ? (
            <p className="mt-2 text-sm text-rose-600">{errors.message.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmittingForm}
          className="flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-center text-[0.65rem] font-semibold uppercase leading-4 tracking-[0.14em] text-white transition hover:bg-[#082d47] disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-15 sm:px-6 sm:py-4 sm:text-xs sm:leading-5 sm:tracking-[0.18em]"
        >
          {isSubmittingForm ? 'Submitting...' : 'Book a Free Consultation'}
        </button>
      </form>
    </div>
  )
}

export default EnquiryForm
