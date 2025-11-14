// types/database.types.ts
export interface Tag {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tagId: string | null;
}

export interface PostWithTag extends Post {
  tag: Tag | null;
}

export interface Testimonial {
  id: string;
  name: string;
  body: string;
  published: boolean;
  rating: number | null;
  createdAt?: string;
  updatedAt?: string;
}