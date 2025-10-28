'use client'

import Link from 'next/link'
import { useActionState, useEffect, useState } from 'react'
import { createTag, type TagFormState } from '@/lib/actions/tagActions'

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function NewTagPage() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false)

  const initialState: TagFormState = {
    success: false,
    message: ''
  }

  const [state, formAction, isPending] = useActionState(createTag, initialState)

  // Auto-generar slug cuando cambia el nombre (solo si no ha sido editado manualmente)
  useEffect(() => {
    if (!isSlugManuallyEdited && name) {
      setSlug(generateSlug(name))
    }
  }, [name, isSlugManuallyEdited])

  const handleSlugChange = (value: string) => {
    setIsSlugManuallyEdited(true)
    setSlug(value)
  }

  return (
    <div className='p-8'>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between max-w-6xl mx-auto">
        <Link
          href="/dashboard/tags"
          className="flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-lg font-DMSans">Volver a Tags</span>
        </Link>
      </div>

      <div className='max-w-6xl mx-auto'>

        {/* Title */}
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-5xl font-Dongle text-amber-900">Nueva Tag</h1>
          <p className="text-lg text-amber-700/60 font-DMSans">Crea una nueva etiqueta para tus posts</p>
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

              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-amber-900 font-DMSans font-semibold mb-2">
                  Nombre de la Tag *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans"
                  placeholder="Ej: Meditación"
                  disabled={isPending}
                />
                {state.errors?.name && (
                  <p className="mt-2 text-red-700 text-sm font-DMSans">{state.errors.name[0]}</p>
                )}
              </div>

              {/* Slug Input */}
              <div>
                <label htmlFor="slug" className="block text-amber-900 font-DMSans font-semibold mb-2">
                  Slug (URL amigable) *
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl  border border-white/20 text-amber-900 font-DMSans font-mono"
                  placeholder="ej: meditacion"
                  disabled={isPending}
                />
                <p className="mt-2 text-amber-700/60 text-sm font-DMSans">
                  Solo letras minúsculas, números y guiones. Se genera automáticamente desde el nombre.
                </p>
                {state.errors?.slug && (
                  <p className="mt-2 text-red-700 text-sm font-DMSans">{state.errors.slug[0]}</p>
                )}
              </div>

              {/* Preview */}
              {slug && (
                <div className="p-4 bg-amber-900/10 rounded-2xl border border-amber-900/20">
                  <p className="text-sm text-amber-700/60 font-DMSans mb-1">Vista previa de la URL:</p>
                  <p className="text-amber-900 font-DMSans font-mono break-all">
                    /blog?tag={slug}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4 pt-4 justify-end w-full">
                <Link
                  href="/dashboard/tags"
                  className="px-6 py-3 bg-white/50 text-amber-900 rounded-2xl font-DMSans hover:bg-white/70 transition-all duration-300 border border-white/40 text-center"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={isPending || !name || !slug}
                  className="flex-2 px-6 py-3 bg-amber-900 text-white rounded-2xl font-DMSans hover:bg-amber-800 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isPending ? 'Creando...' : 'Crear Tag'}
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}