import type { ApiaryState } from '../models/apiary';
import { Section } from '../components/Section';
import { StatCard } from '../components/StatCard';
import { createCloudUserProfile, markEmailVerified } from '../logic/auth20';
import { auditChange, createDataVersion } from '../logic/audit20';
import { buildColonyRanking, buildDailyPriority, buildPredictions20, buildRecommendations20, createPhotoAnalysis } from '../logic/assistant20';
import { buildDefaultPermissionRules, canAccess, createSharedMember } from '../logic/permissions20';
import { createSyncHistory, createSyncQueueItem, detectConflict, enqueueSync, getSyncStatus } from '../logic/sync20';
import { buildDataQualityReport, buildNotificationCenter, buildRcAuditSummary } from '../logic/rcQuality20';

interface PlatformPageProps {
  state: ApiaryState;
  onBack: () => void;
  onStateChange: (state: ApiaryState) => void;
}

export function PlatformPage({ state, onBack, onStateChange }: PlatformPageProps) {
  const syncStatus = getSyncStatus(state);
  const ranking = buildColonyRanking(state);
  const recommendations = buildRecommendations20(state);
  const predictions = buildPredictions20(state);
  const dailyPriority = buildDailyPriority(state);
  const rules = state.permissionRules?.length ? state.permissionRules : buildDefaultPermissionRules();
  const rcAudit = buildRcAuditSummary(state);
  const dataQuality = buildDataQualityReport(state);
  const notifications = buildNotificationCenter(state);

  function prepareCloudProfile() {
    const profile = markEmailVerified(createCloudUserProfile('uzytkownik@bgapiary.local', 'Użytkownik BgApiary', 'email'));
    onStateChange({ ...state, cloudProfile: profile });
  }

  function addSyncDemo() {
    const item = createSyncQueueItem('hive', state.hives[0]?.id ?? 'hive-demo', 'update', { ready: true });
    const next = enqueueSync(state, item);
    onStateChange({ ...next, syncHistory: [createSyncHistory(next, 'pending', 'Dodano zmianę do kolejki offline-first'), ...(state.syncHistory ?? [])] });
  }

  function addConflictDemo() {
    const conflict = detectConflict('hive', state.hives[0]?.id ?? 'hive-demo', { strength: 8 }, { strength: 7 });
    onStateChange({ ...state, syncConflicts: [conflict, ...(state.syncConflicts ?? [])] });
  }

  function addShareDemo() {
    const apiaryId = state.apiaries[0]?.id ?? 'apiary-demo';
    const member = createSharedMember(apiaryId, 'jarek@example.com', 'manager');
    onStateChange({ ...state, sharedMembers: [member, ...(state.sharedMembers ?? [])], permissionRules: rules });
  }

  function addAuditAndVersionDemo() {
    const hive = state.hives[0];
    if (!hive) return;
    let next = auditChange(state, 'local-user', state.cloudProfile?.email ?? 'lokalnie', 'update', 'hive', hive.id, `Zmieniono dane ula ${hive.name}`, hive, hive);
    next = { ...next, dataVersions: [createDataVersion('hive', hive.id, 'local-user', hive, next.dataVersions ?? []), ...(next.dataVersions ?? [])] };
    onStateChange(next);
  }

  function saveAssistantSnapshot() {
    const photo = createPhotoAnalysis('photo-demo', state.hives[0]?.id, ['ramki', 'czerw', 'miod'], 'Metadane zdjęcia gotowe pod przyszłą analizę AI.');
    onStateChange({
      ...state,
      hiveAIProfiles: state.hives.map(hive => ({ hiveId: hive.id, strengthTrend: hive.strength >= 7 ? 'rosnie' : 'stabilna', queenQuality: 80, healthRisk: 20, productivity: hive.strength * 10, lastUpdatedAt: new Date().toISOString() })),
      colonyScores: ranking,
      recommendations20: recommendations,
      predictions,
      photoAnalyses: [photo, ...(state.photoAnalyses ?? [])]
    });
  }

  return (
    <>
      <button className="back-button" onClick={onBack}>‹ Więcej</button>

      <section className="platform-hero">
        <div>
          <span>BgApiary 2.0</span>
          <h1>Platforma Pasieczna</h1>
          <p>Konta produkcyjne, synchronizacja gotowa pod chmurę, współdzielenie, uprawnienia, dziennik zmian i Asystent 2.0. Bez podłączonego backendu i bez realnej analizy zdjęć online, bo bajki zostawiamy katalogom marketingowym.</p>
        </div>
        <div className="platform-badge">
          <strong>{syncStatus}</strong>
          <small>status sync</small>
        </div>
      </section>

      <div className="reports-kpi-grid compact">
        <StatCard label="Kolejka sync" value={(state.syncQueue ?? []).length} />
        <StatCard label="Konflikty" value={(state.syncConflicts ?? []).filter(item => !item.resolvedAt).length} />
        <StatCard label="Członkowie" value={(state.sharedMembers ?? []).length} />
        <StatCard label="Rekomendacje" value={recommendations.length} />
        <StatCard label="Jakość danych" value={dataQuality.length} />
      </div>

      <Section title="Status RC">
        <div className="card platform-card">
          <strong>{rcAudit.cloudReadyMessage}</strong>
          <p>{rcAudit.aiReadyMessage} Powiadomienia: {notifications.length}. Braki jakości danych: {dataQuality.length}.</p>
        </div>
      </Section>

      <Section title="Konta produkcyjne">
        <div className="card platform-card">
          <strong>{state.cloudProfile?.email ?? 'Profil cloud-ready nieutworzony'}</strong>
          <p>Status: {state.cloudProfile?.status ?? 'brak'} · Google: {state.cloudProfile?.googleReady ? 'gotowe' : 'architektura'} · Apple: {state.cloudProfile?.appleReady ? 'gotowe' : 'architektura'}</p>
          <button className="wide-action" onClick={prepareCloudProfile}>Przygotuj profil produkcyjny</button>
        </div>
      </Section>

      <Section title="Synchronizacja offline-first">
        <div className="card platform-card">
          <p>Kolejka zmian, historia synchronizacji i konflikty są przygotowane pod przyszłą bazę chmurową.</p>
          <button className="wide-action" onClick={addSyncDemo}>Dodaj zmianę do kolejki sync</button>
          <button className="wide-action" onClick={addConflictDemo}>Zasymuluj konflikt</button>
        </div>
      </Section>

      <Section title="Współdzielenie i uprawnienia">
        <div className="card platform-card">
          <p>Administrator, Manager, Pracownik i Obserwator. Przykład: manager może edytować ule: {canAccess(rules, 'manager', 'hives', 'write') ? 'tak' : 'nie'}.</p>
          <button className="wide-action" onClick={addShareDemo}>Dodaj przykładowe zaproszenie</button>
        </div>
      </Section>

      <Section title="Audit log i wersjonowanie">
        <div className="card platform-card">
          <p>Zmiany mogą zapisywać kto, kiedy i co zmienił. Wersjonowanie przygotowuje cofanie zmian.</p>
          <button className="wide-action" onClick={addAuditAndVersionDemo}>Zapisz wpis audytu i wersję ula</button>
        </div>
      </Section>

      <Section title="Asystent 2.0">
        <div className="card platform-card">
          <strong>Priorytet dnia: {dailyPriority?.title ?? 'brak'}</strong>
          <p>Ranking rodzin, ocena 0–100, ryzyko, rekomendacje i prognozy są liczone lokalnym silnikiem reguł.</p>
          <button className="wide-action" onClick={saveAssistantSnapshot}>Zapisz analizę Asystenta 2.0</button>
        </div>
        {ranking.slice(0, 5).map(item => (
          <div className="card platform-score-card" key={item.hiveId}>
            <strong>{state.hives.find(hive => hive.id === item.hiveId)?.name ?? item.hiveId}: {item.score}/100</strong>
            <p>{item.reasons.join(' · ')}</p>
          </div>
        ))}
      </Section>

      <Section title="Zdjęcia AI-ready">
        <div className="card platform-card">
          <p>Metadane zdjęć: ramki, matka, czerw, pyłek, warroza i miód. Analiza AI będzie mogła wejść później bez przebudowy danych.</p>
          <p>Zapisane analizy zdjęć: {(state.photoAnalyses ?? []).length}</p>
        </div>
      </Section>
    </>
  );
}
