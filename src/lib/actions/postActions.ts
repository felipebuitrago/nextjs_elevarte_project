"use server"
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { generateId } from "../utils";

export async function savePost(prevState: any, formData: FormData) {
  try {
    const htmlContent = formData.get('content') as string;
    const supabase = await createClient();

    const coverImage = formData.get('coverImage') as string;

    if (!coverImage) {
      return { success: false, message: 'La imagen de portada es requerida' };
    }
    // Crear post en la base de datos
    const { error: createError } = await supabase
      .from('Post')
      .insert({
        id: generateId(),
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        excerpt: formData.get('excerpt') as string,
        coverImage: formData.get('coverImage') as string,
        content: htmlContent,
        published: false,
        tagId: formData.get('tagId') as string || null,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });

    if (createError) throw createError;
    return { success: true, message: 'Post creado correctamente' };
  } catch (error: any) {
    return { success: false, message: "Error al crear el Post" };
  }
}

export async function updatePost(prevState: any, formData: FormData) {
  try {
    const postId = formData.get('postId') as string;
    const htmlContent = formData.get('content') as string;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const coverImage = formData.get('coverImage') as string;
    const tagId = formData.get('tagId') as string;

    // Construir objeto de actualización solo con campos que tienen valor
    const updateData: any = {};

    if (title) updateData.title = title;
    if (slug) updateData.slug = slug;
    if (excerpt) updateData.excerpt = excerpt;
    if (htmlContent) updateData.content = htmlContent;
    if (coverImage) updateData.coverImage = coverImage;

    // TagId puede ser null intencionalmente
    updateData.tagId = tagId || null;

    const supabase = await createClient();
    const { error } = await supabase
      .from('Post')
      .update({
        title: updateData.title,
        slug: updateData.slug,
        excerpt: updateData.excerpt,
        content: updateData.content,
        coverImage: updateData.coverImage,
        tagId: updateData.tagId,
        updatedAt: new Date().toISOString()
      })
      .eq('id', postId);

    if (error) throw error;

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    return { success: true, message: 'Post actualizado correctamente' };
  } catch (error: any) {
    console.error('Error updating post:', error);
    return { success: false, message: "Error al actualizar el Post" };
  }
}

export async function togglePostPublished(id: string, newValue: boolean): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('Post')
      .update({
        published: newValue,
        updatedAt: new Date().toISOString(),
        publishedAt: newValue ? new Date().toISOString() : null,
      })
      .eq('id', id);

    if (error) throw error;

    // Revalidar la página para reflejar los cambios
    revalidatePath('/dashboard/posts')

    return { success: true, message: 'Post actualizado correctamente' }
  } catch (error) {
    console.error('Error updating post:', error)
    return {
      success: false,
      message: 'Error al actualizar el post. Por favor intenta de nuevo.',
    }
  }
}