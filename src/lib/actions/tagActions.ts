"use server"

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export type TagFormState = {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    slug?: string[]
  }
}

// Schema de validación con Zod
const tagSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .trim(),
  slug: z
    .string()
    .min(1, 'El slug es requerido')
    .min(2, 'El slug debe tener al menos 2 caracteres')
    .max(50, 'El slug no puede exceder 50 caracteres')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'El slug solo puede contener letras minúsculas, números y guiones'
    )
    .trim()
})

export async function createTag(
  prevState: TagFormState,
  formData: FormData
): Promise<TagFormState> {
  // Extraer datos del formulario
  const rawData = {
    name: formData.get('name')?.toString(),
    slug: formData.get('slug')?.toString()
  }

  // Validar con Zod
  const validatedFields = tagSchema.safeParse(rawData)

  // Si la validación falla, retornar errores
  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Por favor corrige los errores',
      errors: validatedFields.error.flatten().fieldErrors as {
        name?: string[]
        slug?: string[]
      }
    }
  }

  const { name, slug } = validatedFields.data

  try {
    // Verificar si existe una tag con el mismo nombre
    const existingByName = await db.tag.findUnique({
      where: { name }
    })

    if (existingByName) {
      return {
        success: false,
        message: 'Ya existe una tag con este nombre',
        errors: {
          name: ['Ya existe una tag con este nombre']
        }
      }
    }

    // Verificar si existe una tag con el mismo slug
    const existingBySlug = await db.tag.findUnique({
      where: { slug }
    })

    if (existingBySlug) {
      return {
        success: false,
        message: 'Ya existe una tag con este slug',
        errors: {
          slug: ['Ya existe una tag con este slug']
        }
      }
    }

    // Crear la tag
    await db.tag.create({
      data: {
        name,
        slug
      }
    })

    // Revalidar la página de tags
    revalidatePath('/dashboard/tags')

    return {
      success: true,
      message: 'Tag creada exitosamente'
    }
  } catch (error) {
    console.error('Error creating tag:', error)
    return {
      success: false,
      message: 'Error al crear la tag. Por favor intenta de nuevo.'
    }
  }
}

export async function toggleTagActive(tagId: string, active: boolean) {
  try {
    await db.tag.update({
      where: { id: tagId },
      data: { active }
    })
    
    // Revalidar la página para reflejar los cambios
    revalidatePath('/dashboard/tags')
    
    return { success: true }
  } catch (error) {
    console.error('Error updating tag:', error)
    return {
      success: false,
      message: 'Error al actualizar la tag. Por favor intenta de nuevo.'
    }
  }
}