'use client'

import Link from 'next/link'
import { useActionState, useEffect, useState } from 'react'
import { createOferta, type OfertaFormState } from '@/lib/actions/ofertaActions'
import { Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NewOfertaPage() {
  const [incluye, setIncluye] = useState<string[]>([''])
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precioOriginal, setPrecioOriginal] = useState('')
  const [precio, setPrecio] = useState('')

  const router = useRouter();

  const initialState: OfertaFormState = {
    success: false,
    message: ''
  }

  const [state, formAction, isPending] = useActionState(createOferta, initialState)

  // Agregar nuevo campo de "incluye"
  const addIncluye = () => {
    setIncluye([...incluye, ''])
  }

  // Eliminar campo de "incluye"
  const removeIncluye = (index: number) => {
    if (incluye.length > 1) {
      setIncluye(incluye.filter((_, i) => i !== index))
    }
  }

  // Actualizar valor de un campo "incluye"
  const updateIncluye = (index: number, value: string) => {
    const newIncluye = [...incluye]
    newIncluye[index] = value
    setIncluye(newIncluye)
  }

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        router.push('/dashboard/ofertas');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state?.success]);

  return (
    <div className='p-8'>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between max-w-6xl mx-auto">
        <Link
          href="/dashboard/ofertas"
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
          <h1 className="text-5xl font-Dongle text-amber-900">Nueva Oferta Especial</h1>
          <p className="text-lg text-amber-700/60 font-DMSans">Crea una nueva promoción para tus clientes</p>
        </div>

        {/* Form */}
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

          {/* Grid de 2 columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Columna Izquierda */}
            <div className="space-y-6">
              {/* Título */}
              <div>
                <label htmlFor="titulo" className="block text-amber-900 font-DMSans font-semibold mb-2">
                  Título de la Oferta *
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  className="w-full px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans"
                  placeholder="Ej: Paquete de Sanación Integral"
                  disabled={isPending}
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
                {state.errors?.titulo && (
                  <p className="mt-2 text-red-700 text-sm font-DMSans">{state.errors.titulo[0]}</p>
                )}
              </div>

              {/* Descripción */}
              <div>
                <label htmlFor="descripcion" className="block text-amber-900 font-DMSans font-semibold mb-2">
                  Descripción *
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans resize-none"
                  placeholder="Describe brevemente la oferta..."
                  disabled={isPending}
                  required
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                {state.errors?.descripcion && (
                  <p className="mt-2 text-red-700 text-sm font-DMSans">{state.errors.descripcion[0]}</p>
                )}
              </div>

              {/* Qué incluye */}
              <div>
                <label className="block text-amber-900 font-DMSans font-semibold mb-2">
                  ¿Qué incluye? *
                </label>
                <div className="space-y-3">
                  {incluye.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        name={`incluye_${index}`}
                        value={item}
                        onChange={(e) => updateIncluye(index, e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans"
                        placeholder={`Item ${index + 1}`}
                        disabled={isPending}
                      />
                      {incluye.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIncluye(index)}
                          className="p-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition-colors"
                          disabled={isPending}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addIncluye}
                  className="mt-3 flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-DMSans transition-colors"
                  disabled={isPending}
                >
                  <Plus className="w-4 h-4" />
                  Agregar item
                </button>
                {state.errors?.incluye && (
                  <p className="mt-2 text-red-700 text-sm font-DMSans">{state.errors.incluye[0]}</p>
                )}
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="space-y-6">
              {/* Precio */}
              <div>
                <label htmlFor="precio" className="block text-amber-900 font-DMSans font-semibold mb-2">
                  Precio *
                </label>
                <input
                  type="text"
                  id="precio"
                  name="precio"
                  className="w-full px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans"
                  placeholder="Ej: $280 CAD"
                  disabled={isPending}
                  required
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
                {state.errors?.precio && (
                  <p className="mt-2 text-red-700 text-sm font-DMSans">{state.errors.precio[0]}</p>
                )}
              </div>

              {/* Precio Original */}
              <div>
                <label htmlFor="precioOriginal" className="block text-amber-900 font-DMSans font-semibold mb-2">
                  Precio Original
                  <span className="text-amber-700/60 font-normal ml-2">(Opcional)</span>
                </label>
                <input
                  type="text"
                  id="precioOriginal"
                  name="precioOriginal"
                  className="w-full px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans"
                  placeholder="Ej: $350 CAD"
                  disabled={isPending}
                  value={precioOriginal}
                  onChange={(e) => setPrecioOriginal(e.target.value)}
                />
                {state.errors?.precioOriginal && (
                  <p className="mt-2 text-red-700 text-sm font-DMSans">{state.errors.precioOriginal[0]}</p>
                )}
              </div>

              {/* Descuento */}
              <div>
                <label htmlFor="descuento" className="block text-amber-900 font-DMSans font-semibold mb-2">
                  Descuento
                  <span className="text-amber-700/60 font-normal ml-2">(Opcional)</span>
                </label>
                <input
                  type="text"
                  id="descuento"
                  name="descuento"
                  className="w-full px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans"
                  placeholder="Ej: 20%"
                  disabled={isPending}
                />
                {state.errors?.descuento && (
                  <p className="mt-2 text-red-700 text-sm font-DMSans">{state.errors.descuento[0]}</p>
                )}
              </div>

              {/* Válido Hasta */}
              <div>
                <label htmlFor="validoHasta" className="block text-amber-900 font-DMSans font-semibold mb-2">
                  Válido Hasta
                  <span className="text-amber-700/60 font-normal ml-2">(Opcional)</span>
                </label>
                <input
                  type="text"
                  id="validoHasta"
                  name="validoHasta"
                  className="w-full px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans"
                  placeholder="Ej: 31 de Diciembre 2025"
                  disabled={isPending}
                />
                {state.errors?.validoHasta && (
                  <p className="mt-2 text-red-700 text-sm font-DMSans">{state.errors.validoHasta[0]}</p>
                )}
              </div>
            </div>
          </div>

          {/* Hidden inputs para los items de incluye */}
          <input type="hidden" name="incluye" value={JSON.stringify(incluye.filter(item => item.trim()))} />

          {/* Preview */}
          <div className="p-6 bg-amber-900/5 rounded-2xl border border-amber-900/20">
            <p className="text-sm text-amber-700/60 font-DMSans mb-3 font-semibold">Vista Previa:</p>
            <div className="bg-white/60 rounded-xl p-5 border border-white/50">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-Dongle text-amber-900 mb-2">
                    {titulo || 'Título de la oferta'}
                  </h3>
                  <p className="text-sm text-amber-900/70 font-DMSans mb-3">
                    {descripcion || 'Descripción de la oferta'}
                  </p>
                  <div className="space-y-1">
                    {incluye.filter(item => item.trim()).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-amber-900/80 font-DMSans">
                        <span>✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  {precioOriginal && (
                    <div className="text-sm text-amber-900/50 line-through font-DMSans">
                      {precioOriginal}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-amber-900 font-Zain">
                    {precio || '$0'}
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4 justify-end">
            <Link
              href="/dashboard/ofertas"
              className="px-6 py-3 bg-white/50 text-amber-900 rounded-2xl font-DMSans hover:bg-white/70 transition-all duration-300 border border-white/40 text-center"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isPending || incluye.filter(item => item.trim()).length === 0}
              className="px-6 py-3 bg-amber-900 text-white rounded-2xl font-DMSans hover:bg-amber-800 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isPending ? 'Creando...' : 'Crear Oferta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}