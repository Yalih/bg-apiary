import { useEffect, useState } from 'react';
import type { Apiary, ApiaryState, Feeding, Hive, HiveEvent, HiveNote, HivePhoto, Inspection, Task } from './models/apiary';
import { loadStateForUser, resetStateForUser, saveStateForUser } from './storage/localStore';
import { AppShell } from './components/AppShell';
import { StartPage } from './pages/StartPage';
import { DashboardPage } from './pages/DashboardPage';
import { ApiariesPage } from './pages/ApiariesPage';
import { HivesPage } from './pages/HivesPage';
import { HiveDetailsPage } from './pages/HiveDetailsPage';
import { TasksPage } from './pages/TasksPage';
import { MorePage } from './pages/MorePage';
import { CreateApiaryPage } from './pages/CreateApiaryPage';
import { CreateHivePage } from './pages/CreateHivePage';
import { CreateInspectionPage } from './pages/CreateInspectionPage';
import { CreateFeedingPage } from './pages/CreateFeedingPage';
import { CreateNotePage } from './pages/CreateNotePage';
import { CreateTaskPage } from './pages/CreateTaskPage';
import { CalendarPage } from './pages/CalendarPage';
import { TodayPage } from './pages/TodayPage';
import { ReportsPage } from './pages/ReportsPage';
import { AssistantPage } from './pages/AssistantPage';
import { BackupPage } from './pages/BackupPage';
import { InventoryPage } from './pages/InventoryPage';
import { HoneyPage } from './pages/HoneyPage';
import { HealthPage } from './pages/HealthPage';
import { SeasonPlanPage } from './pages/SeasonPlanPage';
import { PlatformPage } from './pages/PlatformPage';
import { CreatePhotoPage } from './pages/CreatePhotoPage';
import { WorkCenterPage } from './pages/WorkCenterPage';
import { QueenReplacementPage } from './pages/QueenReplacementPage';
import { ApiaryMapPage } from './pages/ApiaryMapPage';
import { FirstRunPage } from './pages/FirstRunPage';
import { TourPage } from './pages/TourPage';
import { QueenCatalogPage } from './pages/QueenCatalogPage';
import { QueenControlPage } from './pages/QueenControlPage';
import { WeatherPage } from './pages/WeatherPage';
import { NectarPage } from './pages/NectarPage';
import { AuthPage } from './pages/AuthPage';
import { applyInspectionToHive, buildEvent, closeTasksForAction, type InspectionForm } from './logic/actions';
import { buildAutomaticTasksAfterFeeding, buildAutomaticTasksAfterInspection, buildSeasonalTasks, completeTask, normalizeTask } from './logic/tasks';
import { recommendationToTask, type Recommendation } from './logic/assistant';
import { buildQueenReplacementDecision, buildQueenReplacementEvent, replaceQueen, type QueenReplacementForm } from './logic/queenReplacement';
import { batchCompleteTasks, buildTodayTour, completeTourTask } from './logic/workTour';
import type { QueenControl, QueenRating } from './models/apiary';
import { getCurrentUser, logoutUser, type TestUser } from './auth/auth';
import { clearUserData, deleteApiaryData, deleteHiveData } from './logic/dataManagement';
import { addInventoryMovement } from './logic/inventory';
import type { InventoryItem, InventoryMovement } from './models/apiary';
import { isEmptyApiaryState } from './storage/emptyState';

export type View = 'start' | 'dashboard' | 'apiaries' | 'hives' | 'hiveDetails' | 'tasks' | 'more' | 'createApiary' | 'createHive' | 'createInspection' | 'createFeeding' | 'createNote' | 'createTask' | 'calendar' | 'today' | 'reports' | 'assistant' | 'backup' | 'createPhoto' | 'workCenter' | 'queenReplacement' | 'apiaryMap' | 'tour' | 'queenCatalog' | 'queenControl' | 'inventory' | 'honey' | 'health' | 'seasonPlan' | 'platform' | 'platform20' | 'weather' | 'nectar';

interface RouteState {
  view: View;
  apiaryId?: string;
  hiveId?: string;
  tourId?: string;
}

function normalizeState(state: ApiaryState): ApiaryState {
  return {
    ...state,
    notes: state.notes ?? [],
    photos: state.photos ?? [],
    decisionEvents: state.decisionEvents ?? [],
    queenControls: state.queenControls ?? [],
    workTours: state.workTours ?? [],
    workPreferences: state.workPreferences ?? {},
    inventoryItems: state.inventoryItems ?? [],
    inventoryMovements: state.inventoryMovements ?? [],
    honeyHarvests: state.honeyHarvests ?? [],
    honeyBatches: state.honeyBatches ?? [],
    honeyJarStocks: state.honeyJarStocks ?? [],
    honeyCustomers: state.honeyCustomers ?? [],
    honeySales: state.honeySales ?? [],
    honeyLabels: state.honeyLabels ?? [],
    varroaMeasurements: state.varroaMeasurements ?? [],
    treatments: state.treatments ?? [],
    healthChecks: state.healthChecks ?? [],
    hiveTransfers: state.hiveTransfers ?? [],
    hiveQuarantines: state.hiveQuarantines ?? [],
    seasonPlans: state.seasonPlans ?? [],
    cloudProfile: state.cloudProfile,
    syncQueue: state.syncQueue ?? [],
    syncHistory: state.syncHistory ?? [],
    syncConflicts: state.syncConflicts ?? [],
    sharedMembers: state.sharedMembers ?? [],
    permissionRules: state.permissionRules ?? [],
    auditLog: state.auditLog ?? [],
    dataVersions: state.dataVersions ?? [],
    hiveAIProfiles: state.hiveAIProfiles ?? [],
    colonyScores: state.colonyScores ?? [],
    recommendations20: state.recommendations20 ?? [],
    predictions: state.predictions ?? [],
    photoAnalyses: state.photoAnalyses ?? [],
    hives: state.hives.map((hive, index) => ({
      ...hive,
      familyStatus: hive.familyStatus ?? (hive.strength >= 8 ? 'strong' : hive.strength <= 4 ? 'weak' : 'medium'),
      queenHistory: hive.queenHistory ?? [],
      queen: { ...hive.queen, status: hive.queen.status ?? 'mated' },
      mapPosition: hive.mapPosition ?? { row: Math.floor(index / 4) + 1, column: (index % 4) + 1 }
    })),
    tasks: state.tasks.map(task => ({ ...normalizeTask(task), workCategory: task.workCategory ?? task.type }))
  };
}

function mergeUniqueTasks(existing: Task[], incoming: Task[]): Task[] {
  const ids = new Set(existing.map(task => task.id));
  return [...existing, ...incoming.filter(task => !ids.has(task.id))];
}

export default function App() {
  const [user, setUser] = useState<TestUser | null>(() => getCurrentUser());
  const [state, setState] = useState<ApiaryState>(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) return normalizeState({
      apiaries: [],
      hives: [],
      inspections: [],
      feedings: [],
      events: [],
      notes: [],
      photos: [],
      tasks: [],
      decisionEvents: [],
      queenControls: [],
      workTours: [],
      workPreferences: {},
      inventoryItems: [],
      inventoryMovements: [],
      honeyHarvests: [],
      honeyBatches: [],
      honeyJarStocks: [],
      honeyCustomers: [],
      honeySales: [],
      honeyLabels: [],
      varroaMeasurements: [],
      treatments: [],
      healthChecks: [],
      hiveTransfers: [],
      hiveQuarantines: [],
      seasonPlans: [],
      syncQueue: [],
      syncHistory: [],
      syncConflicts: [],
      sharedMembers: [],
      permissionRules: [],
      auditLog: [],
      dataVersions: [],
      hiveAIProfiles: [],
      colonyScores: [],
      recommendations20: [],
      predictions: [],
      photoAnalyses: [],
      lastOpenedHiveId: undefined
    });
    const loaded = normalizeState(loadStateForUser(currentUser.id));
    return { ...loaded, tasks: mergeUniqueTasks(loaded.tasks, buildSeasonalTasks(loaded.hives)) };
  });
  const [route, setRoute] = useState<RouteState>({ view: 'dashboard' });

  useEffect(() => {
    if (user) saveStateForUser(user.id, state);
  }, [state, user]);

  function handleAuthenticated(nextUser: TestUser) {
    setUser(nextUser);
    const loaded = normalizeState(loadStateForUser(nextUser.id));
    setState({ ...loaded, tasks: mergeUniqueTasks(loaded.tasks, buildSeasonalTasks(loaded.hives)) });
    setRoute({ view: 'dashboard' });
  }

  function handleLogout() {
    logoutUser();
    setUser(null);
    setRoute({ view: 'dashboard' });
  }

  if (!user) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  const activeUser = user;

  if (isEmptyApiaryState(state) && route.view === 'dashboard') {
    return (
      <FirstRunPage
        onCreateApiary={() => setRoute({ view: 'createApiary' })}
        onImportBackup={() => setRoute({ view: 'backup' })}
      />
    );
  }

  function navigate(view: View) {
    setRoute({ view });
  }

  function openApiary(apiaryId: string) {
    setRoute({ view: 'hives', apiaryId });
  }

  function openHive(hiveId: string) {
    setState(current => ({ ...current, lastOpenedHiveId: hiveId }));
    setRoute({ view: 'hiveDetails', hiveId });
  }

  function openTask(taskId: string) {
    const task = state.tasks.find(item => item.id === taskId);
    if (!task) return;

    if (task.targetAction === 'inspection') {
      setRoute({ view: 'createInspection', hiveId: task.hiveId });
      return;
    }

    if (task.targetAction === 'feeding') {
      setRoute({ view: 'createFeeding', hiveId: task.hiveId });
      return;
    }

    if (task.targetAction === 'note') {
      setRoute({ view: 'createNote', hiveId: task.hiveId });
      return;
    }

    if (task.targetAction === 'queen_replacement') {
      setRoute({ view: 'queenReplacement', hiveId: task.hiveId });
      return;
    }

    openHive(task.hiveId);
  }

  function completeTaskById(taskId: string) {
    setState(current => ({
      ...current,
      tasks: completeTask(current.tasks, taskId)
    }));
  }

  function completeManyTasks(taskIds: string[]) {
    setState(current => ({
      ...current,
      tasks: batchCompleteTasks(current.tasks, taskIds)
    }));
  }

  function startWorkTour(apiaryId?: string) {
    const tour = buildTodayTour(state, apiaryId);
    setState(current => ({
      ...current,
      workTours: [tour, ...(current.workTours ?? []).filter(item => item.id !== tour.id)]
    }));
    setRoute({ view: 'tour', tourId: tour.id });
  }

  function completeTaskInTour(taskId: string) {
    setState(current => {
      const tour = current.workTours?.find(item => item.id === route.tourId);
      if (!tour) return current;
      return {
        ...current,
        workTours: current.workTours?.map(item => item.id === tour.id ? completeTourTask(item, taskId, current.tasks) : item)
      };
    });
  }

  function createTask(task: Task) {
    setState(current => ({
      ...current,
      tasks: [task, ...current.tasks]
    }));
    setRoute({ view: 'tasks' });
  }

  function createApiary(apiary: Apiary) {
    setState(current => ({
      ...current,
      apiaries: [...current.apiaries, apiary]
    }));
    setRoute({ view: 'hives', apiaryId: apiary.id });
  }

  function updateApiary(apiary: Apiary) {
    setState(current => ({
      ...current,
      apiaries: current.apiaries.map(item => item.id === apiary.id ? apiary : item)
    }));
  }

  function createHive(hive: Hive, event: HiveEvent) {
    setState(current => ({
      ...current,
      hives: [...current.hives, hive],
      events: [...current.events, event],
      lastOpenedHiveId: hive.id
    }));
    setRoute({ view: 'hiveDetails', hiveId: hive.id });
  }

  function createInspection(hiveId: string, form: InspectionForm, inspection: Inspection) {
    const event = buildEvent(
      hiveId,
      inspection.date,
      'inspection',
      'Dodano przegląd',
      `${inspection.summary} Czerw: ${inspection.brood}. Mateczniki: ${inspection.cells}.`
    );

    setState(current => {
      const updatedHives = current.hives.map(hive => hive.id === hiveId ? applyInspectionToHive(hive, form) : hive);
      const updatedHive = updatedHives.find(hive => hive.id === hiveId);
      const automaticTasks = updatedHive ? buildAutomaticTasksAfterInspection(updatedHive, inspection.cells, inspection.date) : [];

      return {
        ...current,
        hives: updatedHives,
        inspections: [inspection, ...current.inspections],
        events: [event, ...current.events],
        tasks: mergeUniqueTasks(closeTasksForAction(current.tasks, hiveId, 'inspection'), automaticTasks),
        lastOpenedHiveId: hiveId
      };
    });
    openHive(hiveId);
  }

  function createFeeding(hiveId: string, feeding: Feeding) {
    const event = buildEvent(
      hiveId,
      feeding.date,
      'feeding',
      'Dodano karmienie',
      `${feeding.type}: ${feeding.amountLiters} ${feeding.unit}. Powód: ${feeding.reason}.`
    );

    setState(current => {
      const updatedHives = current.hives.map(hive => hive.id === hiveId ? {
        ...hive,
        foodLevel: 'dobry' as const,
        nextAction: 'Obserwować pobieranie pokarmu'
      } : hive);
      const updatedHive = updatedHives.find(hive => hive.id === hiveId);
      const automaticTasks = updatedHive ? buildAutomaticTasksAfterFeeding(updatedHive, feeding.date) : [];

      return {
        ...current,
        feedings: [feeding, ...current.feedings],
        events: [event, ...current.events],
        hives: updatedHives,
        tasks: mergeUniqueTasks(closeTasksForAction(current.tasks, hiveId, 'feeding'), automaticTasks),
        lastOpenedHiveId: hiveId
      };
    });
    openHive(hiveId);
  }

  function createNote(hiveId: string, note: HiveNote) {
    const event = buildEvent(
      hiveId,
      note.date,
      'note',
      'Dodano notatkę',
      note.text
    );

    setState(current => ({
      ...current,
      notes: [note, ...current.notes],
      events: [event, ...current.events],
      lastOpenedHiveId: hiveId
    }));
    openHive(hiveId);
  }

  function createPhoto(photo: HivePhoto) {
    const event = buildEvent(
      photo.hiveId,
      photo.date,
      'note',
      'Dodano zdjęcie',
      `${photo.title}: ${photo.description}`
    );

    setState(current => ({
      ...current,
      photos: [photo, ...current.photos],
      events: [event, ...current.events],
      lastOpenedHiveId: photo.hiveId
    }));
    openHive(photo.hiveId);
  }

  function restoreState(restored: ApiaryState) {
    const normalized = normalizeState(restored);
    setState({ ...normalized, tasks: mergeUniqueTasks(normalized.tasks, buildSeasonalTasks(normalized.hives)) });
    setRoute({ view: 'dashboard' });
  }


  function runRecommendation(recommendation: Recommendation) {
    if (recommendation.targetAction === 'inspection') {
      setRoute({ view: 'createInspection', hiveId: recommendation.hiveId });
      return;
    }

    if (recommendation.targetAction === 'feeding') {
      setRoute({ view: 'createFeeding', hiveId: recommendation.hiveId });
      return;
    }

    if (recommendation.targetAction === 'note') {
      setRoute({ view: 'createNote', hiveId: recommendation.hiveId });
      return;
    }

    openHive(recommendation.hiveId);
  }

  function createTaskFromRecommendation(recommendation: Recommendation) {
    const task = recommendationToTask(recommendation, state);
    setState(current => ({
      ...current,
      tasks: [task, ...current.tasks]
    }));
    setRoute({ view: 'tasks' });
  }

  function replaceHiveQueen(hiveId: string, form: QueenReplacementForm) {
    const event = buildQueenReplacementEvent(hiveId, form);
    const decision = buildQueenReplacementDecision(hiveId, form);

    setState(current => ({
      ...current,
      hives: current.hives.map(hive => hive.id === hiveId ? replaceQueen(hive, form) : hive),
      events: [event, ...current.events],
      decisionEvents: [decision, ...(current.decisionEvents ?? [])],
      lastOpenedHiveId: hiveId
    }));
    setRoute({ view: 'hiveDetails', hiveId });
  }

  function saveQueenControl(hiveId: string, control: QueenControl, rating?: QueenRating) {
    setState(current => ({
      ...current,
      queenControls: [control, ...(current.queenControls ?? [])],
      hives: current.hives.map(hive => hive.id === hiveId ? {
        ...hive,
        queen: {
          ...hive.queen,
          acceptanceStatus: control.status,
          status: control.status,
          lastControlAt: control.date,
          rating: rating ?? hive.queen.rating
        },
        nextAction: control.status === 'accepted' || control.status === 'mated' ? 'Kontynuować obserwację rozwoju' : 'Skontrolować matkę'
      } : hive),
      events: [{
        id: `event-queen-control-${Date.now()}`,
        hiveId,
        date: control.date,
        type: 'status',
        title: 'Kontrola matki',
        details: `${control.status}. ${control.note}`
      }, ...current.events]
    }));
    setRoute({ view: 'queenCatalog' });
  }

  function addInventoryItem(item: InventoryItem) {
    setState(current => ({
      ...current,
      inventoryItems: [item, ...(current.inventoryItems ?? [])]
    }));
  }

  function addInventoryMove(movement: InventoryMovement) {
    setState(current => addInventoryMovement(current, movement));
  }

  function clearMyData() {
    if (!confirm('Na pewno wyczyścić wszystkie dane tego konta? Tej operacji nie da się cofnąć.')) return;
    setState(clearUserData());
    setRoute({ view: 'dashboard' });
  }

  function removeApiary(apiaryId: string) {
    const apiary = state.apiaries.find(item => item.id === apiaryId);
    if (!apiary) return;
    if (!confirm(`Usunąć pasiekę "${apiary.name}" razem z jej ulami i całą historią?`)) return;
    setState(current => deleteApiaryData(current, apiaryId));
    setRoute({ view: 'more' });
  }

  function removeHive(hiveId: string) {
    const hive = state.hives.find(item => item.id === hiveId);
    if (!hive) return;
    if (!confirm(`Usunąć ul "${hive.name}" razem z historią, zadaniami, przeglądami, karmieniami, notatkami, zdjęciami i kontrolami matki?`)) return;
    setState(current => deleteHiveData(current, hiveId));
    setRoute({ view: 'more' });
  }

  function handleResetDemo() {
    const reset = normalizeState(resetStateForUser(activeUser.id));
    setState({ ...reset, tasks: mergeUniqueTasks(reset.tasks, buildSeasonalTasks(reset.hives)) });
    setRoute({ view: 'dashboard' });
  }

  let page = (
    <StartPage
      state={state}
      onGoDashboard={() => navigate('dashboard')}
      onGoApiaries={() => navigate('apiaries')}
      onCreateApiary={() => navigate('createApiary')}
      onOpenTask={openTask}
    />
  );

  if (route.view === 'dashboard') {
    page = (
      <DashboardPage
        state={state}
        onOpenHive={openHive}
        onGoApiaries={() => navigate('apiaries')}
        onCompleteTask={completeTaskById}
        onOpenTask={openTask}
        onGoCalendar={() => navigate('calendar')}
        onOpenWeather={() => navigate('weather')}
        onOpenNectar={() => navigate('nectar')}
      />
    );
  }

  if (route.view === 'apiaries') {
    page = <ApiariesPage state={state} onOpenApiary={openApiary} onCreateApiary={() => navigate('createApiary')} onUpdateApiary={updateApiary} onOpenHive={openHive} />;
  }

  if (route.view === 'hives') {
    page = (
      <HivesPage
        state={state}
        apiaryId={route.apiaryId ?? ''}
        onBack={() => navigate('apiaries')}
        onOpenHive={openHive}
        onCreateHive={(apiaryId) => setRoute({ view: 'createHive', apiaryId })}
        onOpenMap={(apiaryId) => setRoute({ view: 'apiaryMap', apiaryId })}
      />
    );
  }

  if (route.view === 'hiveDetails') {
    page = (
      <HiveDetailsPage
        state={state}
        hiveId={route.hiveId ?? ''}
        onBack={() => {
          const hive = state.hives.find(item => item.id === route.hiveId);
          if (hive) openApiary(hive.apiaryId);
          else navigate('apiaries');
        }}
        onCompleteTask={completeTaskById}
        onCreateInspection={(hiveId) => setRoute({ view: 'createInspection', hiveId })}
        onCreateFeeding={(hiveId) => setRoute({ view: 'createFeeding', hiveId })}
        onCreateNote={(hiveId) => setRoute({ view: 'createNote', hiveId })}
        onCreatePhoto={(hiveId) => setRoute({ view: 'createPhoto', hiveId })}
        onReplaceQueen={(hiveId) => setRoute({ view: 'queenReplacement', hiveId })}
      />
    );
  }

  if (route.view === 'tasks') {
    page = <TasksPage state={state} onOpenHive={openHive} onOpenTask={openTask} onCompleteTask={completeTaskById} onCreateTask={() => navigate('createTask')} />;
  }


  if (route.view === 'workCenter') {
    page = <WorkCenterPage state={state} onOpenTask={openTask} onCompleteTask={completeTaskById} onCompleteManyTasks={completeManyTasks} onCreateTask={() => navigate('createTask')} onStartTour={startWorkTour} />;
  }

  if (route.view === 'apiaryMap') {
    page = (
      <ApiaryMapPage
        state={state}
        apiaryId={route.apiaryId ?? ''}
        onBack={() => setRoute({ view: 'hives', apiaryId: route.apiaryId })}
        onOpenHive={openHive}
      />
    );
  }

  if (route.view === 'queenReplacement') {
    const hive = state.hives.find(item => item.id === route.hiveId);
    page = hive ? (
      <QueenReplacementPage
        hive={hive}
        onBack={() => openHive(hive.id)}
        onReplace={(form) => replaceHiveQueen(hive.id, form)}
      />
    ) : <div className="empty-card">Nie znaleziono ula.</div>;
  }


  if (route.view === 'tour') {
    const tour = state.workTours?.find(item => item.id === route.tourId);
    page = tour ? (
      <TourPage
        state={state}
        tour={tour}
        onBack={() => navigate('workCenter')}
        onOpenTask={openTask}
        onCompleteTask={completeTaskById}
        onCompleteTourTask={completeTaskInTour}
      />
    ) : <div className="empty-card">Nie znaleziono obchodu.</div>;
  }


  if (route.view === 'queenCatalog') {
    page = (
      <QueenCatalogPage
        state={state}
        onBack={() => navigate('more')}
        onOpenHive={openHive}
        onControlQueen={(hiveId) => setRoute({ view: 'queenControl', hiveId })}
      />
    );
  }

  if (route.view === 'queenControl') {
    const hive = state.hives.find(item => item.id === route.hiveId);
    page = hive ? (
      <QueenControlPage
        hive={hive}
        onBack={() => setRoute({ view: 'queenCatalog' })}
        onSave={(control, rating) => saveQueenControl(hive.id, control, rating)}
      />
    ) : <div className="empty-card">Nie znaleziono ula.</div>;
  }






  if (route.view === 'platform') {
    page = (
      <PlatformPage
        state={state}
        onBack={() => navigate('more')}
        onStateChange={setState}
      />
    );
  }



  if (route.view === 'weather') {
    page = <WeatherPage state={state} onBack={() => navigate('dashboard')} />;
  }

  if (route.view === 'nectar') {
    page = <NectarPage state={state} onBack={() => navigate('dashboard')} />;
  }

  if (route.view === 'platform20') {
    page = (
      <PlatformPage
        state={state}
        onBack={() => navigate('more')}
        onStateChange={setState}
      />
    );
  }

  if (route.view === 'seasonPlan') {
    page = (
      <SeasonPlanPage
        state={state}
        onBack={() => navigate('more')}
        onStateChange={setState}
      />
    );
  }

  if (route.view === 'health') {
    page = (
      <HealthPage
        state={state}
        onBack={() => navigate('more')}
        onStateChange={setState}
      />
    );
  }

  if (route.view === 'honey') {
    page = (
      <HoneyPage
        state={state}
        onBack={() => navigate('more')}
        onStateChange={setState}
      />
    );
  }

  if (route.view === 'inventory') {
    page = (
      <InventoryPage
        state={state}
        onBack={() => navigate('more')}
        onAddItem={addInventoryItem}
        onAddMovement={addInventoryMove}
      />
    );
  }

  if (route.view === 'more') {
    page = (
      <MorePage
        state={state}
        user={activeUser}
        onLogout={handleLogout}
        onResetDemo={handleResetDemo}
        onClearMyData={clearMyData}
        onBackup={() => navigate('backup')}
        onReports={() => navigate('reports')}
        onQueens={() => navigate('queenCatalog')}
        onInventory={() => navigate('inventory')}
        onHoney={() => navigate('honey')}
        onHealth={() => navigate('health')}
        onSeasonPlan={() => navigate('seasonPlan')}
        onPlatform20={() => navigate('platform20')}
        onPlatform={() => navigate('platform')}
        onCreateApiary={() => navigate('createApiary')}
        onCreateHive={(apiaryId) => setRoute({ view: 'createHive', apiaryId })}
        onDeleteApiary={removeApiary}
        onDeleteHive={removeHive}
      />
    );
  }

  if (route.view === 'calendar') {
    page = <CalendarPage state={state} onOpenTask={openTask} />;
  }

  if (route.view === 'today') {
    page = <TodayPage state={state} onOpenTask={openTask} onCompleteTask={completeTaskById} />;
  }

  if (route.view === 'reports') {
    page = <ReportsPage state={state} />;
  }

  if (route.view === 'assistant') {
    page = (
      <AssistantPage
        state={state}
        onOpenHive={openHive}
        onRunRecommendation={runRecommendation}
        onCreateTaskFromRecommendation={createTaskFromRecommendation}
      />
    );
  }

  if (route.view === 'backup') {
    page = <BackupPage state={state} onRestore={restoreState} />;
  }

  if (route.view === 'createTask') {
    page = <CreateTaskPage state={state} hiveId={route.hiveId} onCancel={() => navigate('tasks')} onCreate={createTask} />;
  }

  if (route.view === 'createApiary') {
    page = <CreateApiaryPage onCancel={() => navigate('apiaries')} onCreate={createApiary} />;
  }

  if (route.view === 'createHive') {
    page = (
      <CreateHivePage
        state={state}
        apiaryId={route.apiaryId}
        onCancel={() => route.apiaryId ? openApiary(route.apiaryId) : navigate('apiaries')}
        onCreate={createHive}
      />
    );
  }

  if (route.view === 'createInspection') {
    const hive = state.hives.find(item => item.id === route.hiveId);
    page = hive ? (
      <CreateInspectionPage
        hive={hive}
        onCancel={() => openHive(hive.id)}
        onCreate={(form, inspection) => createInspection(hive.id, form, inspection)}
      />
    ) : <div className="empty-card">Nie znaleziono ula.</div>;
  }

  if (route.view === 'createFeeding') {
    const hive = state.hives.find(item => item.id === route.hiveId);
    page = hive ? (
      <CreateFeedingPage
        hive={hive}
        onCancel={() => openHive(hive.id)}
        onCreate={(feeding) => createFeeding(hive.id, feeding)}
      />
    ) : <div className="empty-card">Nie znaleziono ula.</div>;
  }

  if (route.view === 'createNote') {
    const hive = state.hives.find(item => item.id === route.hiveId);
    page = hive ? (
      <CreateNotePage
        hive={hive}
        onCancel={() => openHive(hive.id)}
        onCreate={(note) => createNote(hive.id, note)}
      />
    ) : <div className="empty-card">Nie znaleziono ula.</div>;
  }

  if (route.view === 'createPhoto') {
    const hive = state.hives.find(item => item.id === route.hiveId);
    page = hive ? (
      <CreatePhotoPage
        state={state}
        hiveId={hive.id}
        onCancel={() => openHive(hive.id)}
        onCreate={createPhoto}
      />
    ) : <div className="empty-card">Nie znaleziono ula.</div>;
  }

  return <AppShell view={route.view} onNavigate={navigate}>{page}</AppShell>;
}
