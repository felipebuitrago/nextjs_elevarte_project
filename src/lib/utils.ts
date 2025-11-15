import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createId } from '@paralleldrive/cuid2';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}

export const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Fecha no disponible';

  return new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(dateString));
};

export function generateId() {
  return createId();
}

export function generateSlug(text: string): string {
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

export const agendarSessionWhatsApp = "https://wa.me/14035890618?text=Hola%20Camila,%20me%20gustaría%20agendar%20una%20sesión";
export const agendarDesarrolloIntuitivoWhatsApp = "https://wa.me/14035890618?text=Hola%20Camila,%20me%20gustaría%20agendar%20un%20taller%20de%20Desarrollo%20Intuitivo";