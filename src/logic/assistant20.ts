import type { ApiaryState, ColonyScore, HiveAIProfile, PhotoAnalysis, PhotoTag, Prediction, Recommendation } from '../models/apiary';

export function buildHiveAIProfile(state: ApiaryState, hiveId: string): HiveAIProfile {
  const hive = state.hives.find(item => item.id === hiveId);
  const measurements = (state.varroaMeasurements ?? []).filter(item => item.hiveId === hiveId);
  const highHealth = measurements.some(item => item.riskLevel === 'wysokie' || item.riskLevel === 'krytyczne');
  return {
    hiveId,
    strengthTrend: (hive?.strength ?? 0) >= 7 ? 'rosnie' : (hive?.strength ?? 0) <= 3 ? 'spada' : 'stabilna',
    queenQuality: hive?.queen.status === 'to_replace' ? 35 : 80,
    healthRisk: highHealth ? 80 : 20,
    productivity: (hive?.strength ?? 0) * 10,
    lastUpdatedAt: new Date().toISOString()
  };
}

export function scoreColony(profile: HiveAIProfile): ColonyScore {
  const score = Math.max(0, Math.min(100, Math.round((profile.queenQuality * 0.35) + ((100 - profile.healthRisk) * 0.35) + (profile.productivity * 0.3))));
  return {
    hiveId: profile.hiveId,
    score,
    risk: score < 35 ? 'critical' : score < 55 ? 'high' : score < 75 ? 'medium' : 'low',
    reasons: [
      `Matka: ${profile.queenQuality}/100`,
      `Ryzyko zdrowia: ${profile.healthRisk}/100`,
      `Produktywność: ${profile.productivity}/100`
    ]
  };
}

export function buildColonyRanking(state: ApiaryState): ColonyScore[] {
  return state.hives.map(hive => scoreColony(buildHiveAIProfile(state, hive.id))).sort((a, b) => b.score - a.score);
}

export function buildRecommendations20(state: ApiaryState): Recommendation[] {
  const ranking = buildColonyRanking(state);
  return ranking.flatMap(score => {
    const hive = state.hives.find(item => item.id === score.hiveId);
    const recs: Recommendation[] = [];
    if (score.risk === 'critical' || score.risk === 'high') {
      recs.push({
        id: `rec-health-${score.hiveId}`,
        hiveId: score.hiveId,
        priority: score.risk,
        title: 'Pilna kontrola rodziny',
        message: `${hive?.name ?? 'Ul'} ma niski wynik ${score.score}/100. Sprawdź matkę, pokarm i zdrowie.`,
        actionType: 'inspection',
        source: 'rules'
      });
    }
    if (hive && hive.strength >= 8) {
      recs.push({
        id: `rec-space-${score.hiveId}`,
        hiveId: score.hiveId,
        priority: 'medium',
        title: 'Sprawdź miejsce w ulu',
        message: `${hive.name} jest silny. Rozważ poszerzenie lub kontrolę nastroju rojowego.`,
        actionType: 'inspection',
        source: 'rules'
      });
    }
    return recs;
  });
}

export function buildPredictions20(state: ApiaryState): Prediction[] {
  return state.hives.map(hive => ({
    id: `prediction-${hive.id}`,
    hiveId: hive.id,
    type: hive.strength >= 8 ? 'swarm' : hive.foodLevel === 'niski' ? 'feeding' : 'strength',
    date: new Date().toISOString().slice(0, 10),
    horizonDays: 14,
    probability: hive.strength >= 8 ? 0.72 : hive.foodLevel === 'niski' ? 0.8 : 0.55,
    value: hive.strength >= 8 ? 'możliwy nastrój rojowy' : hive.foodLevel === 'niski' ? 'potrzebne karmienie' : 'stabilny rozwój',
    reason: `Siła ${hive.strength}/10, pokarm: ${hive.foodLevel}`
  }));
}

export function buildDailyPriority(state: ApiaryState): Recommendation | undefined {
  return buildRecommendations20(state).sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority))[0];
}

function priorityRank(priority: Recommendation['priority']) {
  return { critical: 0, high: 1, medium: 2, low: 3 }[priority];
}

export function createPhotoAnalysis(photoId: string, hiveId: string | undefined, tags: PhotoTag[], notes = ''): PhotoAnalysis {
  return {
    id: `photo-analysis-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    photoId,
    hiveId,
    date: new Date().toISOString(),
    tags,
    framesDetected: tags.includes('ramki') ? 1 : undefined,
    queenVisible: tags.includes('matka'),
    broodVisible: tags.includes('czerw'),
    pollenVisible: tags.includes('pylek'),
    varroaSuspicion: tags.includes('warroza'),
    honeyVisible: tags.includes('miod'),
    notes
  };
}
