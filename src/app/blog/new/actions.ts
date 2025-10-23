"use server"

import db from "@/lib/db";

export async function saveAndCreatePost(prevState: any, formData: FormData) {
    try {
        const htmlContent = formData.get('content') as string;
        const post = await db.post.create({
            data: {
                title: formData.get('title') as string,
                slug: formData.get('slug') as string,
                excerpt: formData.get('excerpt') as string,
                coverImage: formData.get('coverImage') as string,
                content: htmlContent,
                published: true,
                publishedAt: new Date(),
                tagId: formData.get('tagId') as string || null,
            }
        });
        return { success: true };
    } catch (error: any) {
        return { success: false };
    }
}

export async function saveAsDraft(prevState: any, formData: FormData) {
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
                publishedAt: null,
                tagId: formData.get('tagId') as string || null,
            }
        });
        return { success: true };
    } catch (error: any) {
        return { success: false };
    }
}