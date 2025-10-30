'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import db from '@/lib/db'

// Schema de validación
const testimonialSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre es muy largo'),
  body: z.string().min(10, 'El testimonio debe tener al menos 10 caracteres').max(500, 'El testimonio es muy largo'),
  rating: z.coerce.number().min(1, 'La calificación mínima es 1').max(5, 'La calificación máxima es 5'),
})

export type TestimonialFormState = {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    body?: string[]
    rating?: string[]
  }
}

export async function createTestimonial(
  prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  try {
    // Extraer datos del formulario
    const rawData = {
      name: formData.get('name'),
      body: formData.get('body'),
      rating: formData.get('rating'),
    }

    // Validar datos
    const validatedData = testimonialSchema.safeParse(rawData)

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Error de validación',
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    // Crear testimonio en la base de datos
    await db.testimonial.create({
      data: {
        name: validatedData.data.name,
        body: validatedData.data.body,
        rating: validatedData.data.rating,
        published: true,
      },
    })

    // Revalidar la ruta
    revalidatePath('/dashboard/testimonios')

    return {
      success: true,
      message: 'Testimonio creado exitosamente',
    }
  } catch (error) {
    console.error('Error al crear testimonio:', error)
    return {
      success: false,
      message: 'Error al crear el testimonio. Por favor intenta de nuevo.',
    }
  }
}

export async function updateTestimonial(
  prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  try {
    const rawData = {
      name: formData.get('name'),
      body: formData.get('body'),
      rating: formData.get('rating'),
    }

    const id = formData.get('id') as string
    const validatedData = testimonialSchema.safeParse(rawData)

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Error de validación',
        errors: validatedData.error.flatten().fieldErrors,
      }
    }

    await db.testimonial.update({
      where: { id },
      data: {
        name: validatedData.data.name,
        body: validatedData.data.body,
        rating: validatedData.data.rating,
      },
    })

    revalidatePath('/dashboard/testimonios')

    return {
      success: true,
      message: 'Testimonio actualizado exitosamente',
    }
  } catch (error) {
    console.error('Error al actualizar testimonio:', error)
    return {
      success: false,
      message: 'Error al actualizar el testimonio. Por favor intenta de nuevo.',
    }
  }
}

export async function toggleTestimonialPublished(id: string, newValue: boolean): Promise<{ success: boolean; message: string }> {
  try {
    await db.testimonial.update({
      where: { id },
      data: { published: newValue }
    })
    
    // Revalidar la página para reflejar los cambios
    revalidatePath('/dashboard/testimonios')

    return { success: true, message: 'Testimonio actualizado correctamente' }
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return {
      success: false,
      message: 'Error al actualizar el testimonio. Por favor intenta de nuevo.',
    }
  }
}