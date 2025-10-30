"use server"

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function savePost(prevState: any, formData: FormData) {
  try {
    const htmlContent = formData.get('content') as string;
    const post = await db.post.create({
      data: {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        excerpt: formData.get('excerpt') as string,
        coverImage: formData.get('coverImage') as string,
        content: htmlContent,
        published: false,
        tagId: formData.get('tagId') as string || null,
      }
    });
    return { success: true };
  } catch (error: any) {
    return { success: false };
  }
}

export async function togglePostPublished(id: string, newValue: boolean): Promise<{ success: boolean; message: string }> {
  try {
    await db.post.update({
      where: { id },
      data: { 
        published: newValue,
        publishedAt: newValue ? new Date() : null,
      }
    })

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