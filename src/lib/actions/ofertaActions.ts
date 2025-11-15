"use server"
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { generateId } from '@/lib/utils';

export interface OfertaFormState {
  success: boolean;
  message: string;
  errors?: {
    titulo?: string[];
    descripcion?: string[];
    incluye?: string[];
    precio?: string[];
    precioOriginal?: string[];
    descuento?: string[];
    validoHasta?: string[];
  };
}

export async function createOferta(
  prevState: OfertaFormState,
  formData: FormData
): Promise<OfertaFormState> {
  const supabase = await createClient();

  // Verificar autenticación
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      message: 'No autorizado'
    };
  }

  // Extraer datos del formulario
  const titulo = formData.get('titulo') as string;
  const descripcion = formData.get('descripcion') as string;
  const incluyeJson = formData.get('incluye') as string;
  const precio = formData.get('precio') as string;
  const precioOriginal = formData.get('precioOriginal') as string;
  const descuento = formData.get('descuento') as string;
  const validoHasta = formData.get('validoHasta') as string;
  const destacada = formData.get('destacada') === 'on';

  // Validaciones
  const errors: OfertaFormState['errors'] = {};

  if (!titulo || titulo.trim().length === 0) {
    errors.titulo = ['El título es requerido'];
  }

  if (!descripcion || descripcion.trim().length === 0) {
    errors.descripcion = ['La descripción es requerida'];
  }

  if (!precio || precio.trim().length === 0) {
    errors.precio = ['El precio es requerido'];
  }

  let incluye: string[] = [];
  try {
    incluye = JSON.parse(incluyeJson);
    if (!Array.isArray(incluye) || incluye.length === 0) {
      errors.incluye = ['Debe incluir al menos un item'];
    }
  } catch {
    errors.incluye = ['Formato de items inválido'];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Por favor corrige los errores',
      errors
    };
  }

  try {
    // Crear la oferta
    const { error: createError } = await supabase
      .from('Oferta')
      .insert({
        id: generateId(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        incluye,
        precio: precio.trim(),
        precioOriginal: precioOriginal?.trim() || null,
        descuento: descuento?.trim() || null,
        validoHasta: validoHasta?.trim() || null,
        destacada,
        activa: true
      });

    if (createError) throw createError;

    revalidatePath('/dashboard/ofertas');
    return {
        success: true,
        message: 'Oferta creada correctamente'
    }

  } catch (error) {
    console.error('Error creating oferta:', error);
    return {
      success: false,
      message: 'Error al crear la oferta. Por favor intenta de nuevo.'
    };
  }
}

export async function deleteOferta(id: string) {
  const supabase = await createClient();

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'No autorizado' };
  }

  try {
    const { error } = await supabase
      .from('Oferta')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/dashboard/ofertas');
    revalidatePath('/');

    return { 
      success: true, 
      message: 'Oferta eliminada correctamente' 
    };
  } catch (error) {
    console.error('Error deleting oferta:', error);
    return {
      success: false,
      message: 'Error al eliminar la oferta'
    };
  }
}

export async function toggleOfertaActiva(id: string, activa: boolean) {
  const supabase = await createClient();

  // Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'No autorizado' };
  }

  try {
    const { error } = await supabase
      .from('Oferta')
      .update({ 
        activa,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/dashboard/ofertas');
    revalidatePath('/');

    return { 
      success: true, 
      message: `Oferta ${activa ? 'activada' : 'desactivada'} correctamente` 
    };
  } catch (error) {
    console.error('Error toggling oferta:', error);
    return {
      success: false,
      message: 'Error al actualizar la oferta'
    };
  }
}