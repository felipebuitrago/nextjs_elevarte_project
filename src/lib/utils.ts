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

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

export function generateId() {
  return createId();
}