import { describe, expect, it } from 'vitest';
import { buildPhoto, validatePhotoForm } from '../logic/photos';

describe('photos 0.9', () => {
  it('validates photo form', () => {
    expect(validatePhotoForm({
      hiveId: '',
      linkedType: 'hive',
      date: '',
      title: '',
      description: '',
      dataUrl: ''
    }).length).toBeGreaterThan(0);
  });

  it('builds photo', () => {
    const photo = buildPhoto({
      hiveId: 'hive-1',
      linkedType: 'inspection',
      linkedId: 'insp-1',
      date: '2026-07-02',
      title: 'Ramka',
      description: 'Opis',
      dataUrl: 'data:image/png;base64,abc'
    });

    expect(photo.hiveId).toBe('hive-1');
    expect(photo.linkedType).toBe('inspection');
  });
});
