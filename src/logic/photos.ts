import type { HivePhoto, PhotoLinkedType } from '../models/apiary';

export interface PhotoForm {
  hiveId: string;
  linkedType: PhotoLinkedType;
  linkedId?: string;
  date: string;
  title: string;
  description: string;
  dataUrl: string;
}

export function validatePhotoForm(form: PhotoForm): string[] {
  const errors: string[] = [];
  if (!form.hiveId) errors.push('Ul jest wymagany.');
  if (!form.date) errors.push('Data zdjęcia jest wymagana.');
  if (!form.title.trim()) errors.push('Tytuł zdjęcia jest wymagany.');
  if (!form.dataUrl.startsWith('data:image/')) errors.push('Zdjęcie musi być plikiem graficznym.');
  return errors;
}

export function buildPhoto(form: PhotoForm): HivePhoto {
  return {
    id: `photo-${Date.now()}`,
    hiveId: form.hiveId,
    linkedType: form.linkedType,
    linkedId: form.linkedId,
    date: form.date,
    title: form.title.trim(),
    description: form.description.trim(),
    dataUrl: form.dataUrl
  };
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Nie udało się odczytać zdjęcia.'));
    reader.readAsDataURL(file);
  });
}
