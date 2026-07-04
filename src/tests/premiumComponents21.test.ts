import { describe, expect, it } from 'vitest';
import { PremiumBadge, PremiumButton, PremiumCard, PremiumEmptyState, PremiumHeader, PremiumSection, PremiumSkeleton, PremiumTile } from '../components/premium/PremiumVisualSystem';

describe('BgApiary 2.1 Premium components', () => {
  it('exports all required premium components', () => {
    expect(PremiumCard).toBeTypeOf('function');
    expect(PremiumTile).toBeTypeOf('function');
    expect(PremiumBadge).toBeTypeOf('function');
    expect(PremiumSection).toBeTypeOf('function');
    expect(PremiumHeader).toBeTypeOf('function');
    expect(PremiumButton).toBeTypeOf('function');
    expect(PremiumEmptyState).toBeTypeOf('function');
    expect(PremiumSkeleton).toBeTypeOf('function');
  });
});
