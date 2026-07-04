import { describe, expect, it } from 'vitest';
import { BGS_VISUAL_ICONS, iconPath } from '../logic/bgsVisual20';

describe('Premium illustrations and icons 2.0', () => {
  it('contains required icon set', () => {
    expect(Object.keys(BGS_VISUAL_ICONS)).toEqual(expect.arrayContaining(['dashboard','hives','plan','weather','nectar','queen','brood','temperature','photos']));
    expect(iconPath('weather')).toContain('M12');
  });
});
