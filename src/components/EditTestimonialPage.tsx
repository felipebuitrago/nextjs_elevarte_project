'use client'

import Link from 'next/link'
import { useActionState, useState } from 'react'
import { updateTestimonial, type TestimonialFormState } from '@/lib/actions/testimonialActions'
import { Star } from 'lucide-react'
import { Testimonial } from '@/types'

type EditTestimonialPageProps = {
  testimonial: Testimonial
}

export default function EditTestimonialPage({ testimonial }: EditTestimonialPageProps) {

  const initialState: TestimonialFormState = {
    success: false,
    message: ''
  }

  const [state, formAction, isPending] = useActionState(updateTestimonial, initialState)

  const [rating, setRating] = useState(testimonial.rating)
  const [hoverRating, setHoverRating] = useState(0)
  const [name, setName] = useState(testimonial.name)
  const [body, setBody] = useState(testimonial.body)

  return (
    <div className='p-8'>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between max-w-6xl mx-auto">
        <Link
          href="/dashboard/testimonios"
          className="flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-lg font-DMSans">Volver</span>
        </Link>
      </div>

      <div className='max-w-6xl mx-auto'>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-5xl font-Dongle text-amber-900">Editar Testimonio</h1>
          <p className="text-lg text-amber-700/60 font-DMSans">Modifica el testimonio existente</p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-9">
          <form action={formAction} className="space-y-6">
            {/* Success Message */}
            {state.success && (
              <div className="p-4 bg-green-100 border border-green-200 rounded-2xl">
                <p className="text-green-800 font-DMSans">{state.message}</p>
              </div>
            )}

            {/* Error Message */}
            {!state.success && state.message && !state.errors && (
              <div className="p-4 bg-red-100 border border-red-200 rounded-2xl">
                <p className="text-red-800 font-DMSans">{state.message}</p>
              </div>
            )}

            <input
              type="text"
              id="id"
              name="id"
              defaultValue={testimonial.id}
              className="hidden"
            />

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-amber-900 font-DMSans font-semibold mb-2">
                Nombre/Iniciales
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans"
                disabled={isPending}
                placeholder="Juan Pérez"
              />
              {state.errors?.name && (
                <p className="mt-2 text-red-700 text-sm font-DMSans">{state.errors.name[0]}</p>
              )}
            </div>

            {/* Body Input */}
            <div>
              <label htmlFor="body" className="block text-amber-900 font-DMSans font-semibold mb-2">
                Testimonio
              </label>
              <textarea
                id="body"
                name="body"
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans resize-none"
                disabled={isPending}
                placeholder="Escribe aquí el testimonio..."
              />
              {state.errors?.body && (
                <p className="mt-2 text-red-700 text-sm font-DMSans">{state.errors.body[0]}</p>
              )}
            </div>

            {/* Rating Input */}
            <div>
              <label className="block text-amber-900 font-DMSans font-semibold mb-2">
                Calificación
              </label>
              <input type="hidden" name="rating" value={rating!} />
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    disabled={isPending}
                    className="transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Star
                      className="w-8 h-8"
                      fill={star <= (hoverRating || rating!) ? "#d97706" : "#9ca3af"}
                      stroke={star <= (hoverRating || rating!) ? "#d97706" : "#9ca3af"}
                    />
                  </button>
                ))}
                <span className="ml-2 text-amber-900 font-DMSans self-center">
                  {rating} {rating === 1 ? 'estrella' : 'estrellas'}
                </span>
              </div>
              {state.errors?.rating && (
                <p className="mt-2 text-red-700 text-sm font-DMSans">{state.errors.rating[0]}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4 justify-end w-full">
              <Link
                href="/dashboard/testimonios"
                className="px-6 py-3 bg-white/50 text-amber-900 rounded-2xl font-DMSans hover:bg-white/70 transition-all duration-300 border border-white/40 text-center"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-3 bg-amber-900 text-white rounded-2xl font-DMSans hover:bg-amber-800 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isPending ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>

          {/* Preview Card */}
          <div className="sticky top-8 h-fit">
            <div className="mb-4">
              <h3 className="text-2xl font-Dongle text-amber-900">Vista Previa</h3>
              <p className="text-sm text-amber-700/60 font-DMSans">Así se verá tu testimonio</p>
            </div>
            <div className="backdrop-blur-xl bg-white/40 rounded-3xl p-8 border border-white/50">
              <div className="flex flex-row items-center justify-between gap-2 mb-4">
                <div className="flex flex-col">
                  <p className="text-2xl font-Zain text-[#8B4513]">
                    {name || 'Nombre del Cliente'}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      fill={i < rating! ? "#d97706" : "#9ca3af"}
                      stroke={i < rating! ? "#d97706" : "#9ca3af"}
                    />
                  ))}
                </div>
              </div>
              <blockquote className="text-sm font-DMSans text-left text-gray-700">
                {body || 'El testimonio aparecerá aquí'}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}