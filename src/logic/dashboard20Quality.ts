export const DASHBOARD20_TOKENS = ['Dashboard 2.0', 'buildRecommendations20', 'buildPredictions20', 'buildDailyPriority'] as const;

export function hasDashboard20Token(token: string): boolean {
  return DASHBOARD20_TOKENS.includes(token as typeof DASHBOARD20_TOKENS[number]);
}
