import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildPredictions20 } from '../logic/assistant20';

describe('predictions 2.0', () => {
  it('builds family development predictions', () => {
    const predictions = buildPredictions20(demoState);
    expect(predictions.length).toBe(demoState.hives.length);
    expect(predictions[0].horizonDays).toBe(14);
  });
});
