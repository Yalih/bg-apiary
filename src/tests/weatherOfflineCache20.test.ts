import { describe, expect, it } from 'vitest';
import { fallbackWeather, readWeatherCache, saveWeatherCache, weatherCacheKey } from '../logic/weather20';

class MemoryStorage implements Storage {
  private data = new Map<string, string>();
  get length() { return this.data.size; }
  clear() { this.data.clear(); }
  getItem(key: string) { return this.data.get(key) ?? null; }
  key(index: number) { return Array.from(this.data.keys())[index] ?? null; }
  removeItem(key: string) { this.data.delete(key); }
  setItem(key: string, value: string) { this.data.set(key, value); }
}

describe('Weather offline cache 2.0', () => {
  it('stores and reads cached weather', () => {
    const storage = new MemoryStorage();
    const weather = fallbackWeather();
    saveWeatherCache('a1', weather, storage);
    expect(weatherCacheKey('a1')).toContain('bgapiary.weather');
    expect(readWeatherCache('a1', storage)?.source).toBe('cache');
  });
});
