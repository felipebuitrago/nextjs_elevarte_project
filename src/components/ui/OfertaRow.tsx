'use client'

import { useState } from 'react';
import { Trash2, Sparkles } from 'lucide-react';
import type { Oferta } from '@/types/';
import { deleteOferta, toggleOfertaActiva } from '@/lib/actions/ofertaActions';

interface OfertaRowProps {
  oferta: Oferta;
}

export default function OfertaRow({ oferta }: OfertaRowProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de eliminar la oferta "${oferta.titulo}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteOferta(oferta.id);
      if (!result.success) {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error deleting oferta:', error);
      alert('Error al eliminar la oferta');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleActiva = async () => {
    setIsToggling(true);
    try {
      const result = await toggleOfertaActiva(oferta.id, !oferta.activa);
      if (!result.success) {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error toggling oferta:', error);
      alert('Error al actualizar la oferta');
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <tr className="border-b border-amber-900/5 hover:bg-white/20 transition-colors duration-200">
      {/* Título */}
      <td className="p-6">
        <div className="flex items-center gap-2">
          <span className="text-amber-900 font-DMSans font-medium">
            {oferta.titulo}
          </span>
        </div>
      </td>

      {/* Precio */}
      <td className="p-6">
        <div className="flex flex-col">
          {oferta.precioOriginal && (
            <span className="text-xs text-amber-700/50 line-through font-DMSans">
              {oferta.precioOriginal}
            </span>
          )}
          <span className="text-amber-900 font-DMSans font-semibold">
            {oferta.precio}
          </span>
        </div>
      </td>

      {/* Descuento */}
      <td className="p-6">
        {oferta.descuento ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200 font-DMSans">
            -{oferta.descuento}
          </span>
        ) : (
          <span className="text-amber-700/40 text-sm font-DMSans">—</span>
        )}
      </td>

      {/* Válida hasta */}
      <td className="p-6 text-amber-700/60 font-DMSans">
        {oferta.validoHasta || (
          <span className="text-amber-700/40">Sin límite</span>
        )}
      </td>

      {/* Estado */}
      <td className="p-6">
        <div className="flex flex-col gap-1">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-DMSans w-fit ${
            oferta.activa 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-gray-100 text-gray-800 border border-gray-200'
          }`}>
            {oferta.activa ? 'Activa' : 'Inactiva'}
          </span>
          {oferta.destacada && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-DMSans bg-amber-100 text-amber-800 border border-amber-200 w-fit">
              Destacada
            </span>
          )}
        </div>
      </td>

      {/* Acciones */}
      <td className="p-6">
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleToggleActiva}
            disabled={isToggling || isDeleting}
            className="px-4 py-2 bg-white/50 text-amber-900 rounded-xl font-DMSans hover:bg-white/70 transition-all duration-300 border border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isToggling ? '...' : oferta.activa ? 'Ocultar' : 'Activar'}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting || isToggling}
            className="px-4 py-2 bg-red-50 text-red-700 rounded-xl font-DMSans hover:bg-red-100 transition-all duration-300 border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isDeleting ? (
              '...'
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Eliminar
              </>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}