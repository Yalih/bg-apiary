import { useMemo, useState } from 'react';
import type { ApiaryState, Priority, WorkCategory } from '../models/apiary';
import { Section } from '../components/Section';
import { TaskCard } from '../components/TaskCard';
import { filterTasksByPriority, getWorkBuckets, groupTasksByApiary, groupTasksByWorkCategory, workCategoryLabel } from '../logic/workCenter';
import { getOpenTasks } from '../logic/tasks';
import { getDailyWorkStats, getTodayTasks, sortTasksForTour } from '../logic/workTour';

interface WorkCenterPageProps {
  state: ApiaryState;
  onOpenTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onCompleteManyTasks: (taskIds: string[]) => void;
  onCreateTask: () => void;
  onStartTour: (apiaryId?: string) => void;
}

type WorkFilter = 'all' | WorkCategory;

export function WorkCenterPage({ state, onOpenTask, onCompleteTask, onCompleteManyTasks, onCreateTask, onStartTour }: WorkCenterPageProps) {
  const [workFilter, setWorkFilter] = useState<WorkFilter>('all');
  const [priority, setPriority] = useState<Priority | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

  const openTasks = getOpenTasks(state.tasks);
  const stats = getDailyWorkStats(state);
  const todayTasks = sortTasksForTour(getTodayTasks(state.tasks), state.hives);
  const filteredByWork = workFilter === 'all' ? openTasks : openTasks.filter(task => (task.workCategory ?? task.type) === workFilter);
  const filteredByPriority = filterTasksByPriority(filteredByWork, priority);
  const tasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return filteredByPriority;
    return filteredByPriority.filter(task => {
      const hive = state.hives.find(item => item.id === task.hiveId);
      const apiary = state.apiaries.find(item => item.id === task.apiaryId);
      return [task.title, task.description, task.type, task.workCategory, hive?.name, hive?.number, hive?.queen.breed, hive?.queen.line, apiary?.name]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [filteredByPriority, query, state.hives, state.apiaries]);

  const buckets = getWorkBuckets(tasks);
  const workGroups = groupTasksByWorkCategory(tasks);
  const apiaryGroups = groupTasksByApiary(tasks, state.apiaries);

  function toggleTask(taskId: string) {
    setSelectedTaskIds(current => current.includes(taskId) ? current.filter(id => id !== taskId) : [...current, taskId]);
  }

  function completeSelected() {
    onCompleteManyTasks(selectedTaskIds);
    setSelectedTaskIds([]);
  }

  function renderTaskList(list: typeof tasks) {
    return list.map(task => (
      <div className={`batch-task-row ${selectedTaskIds.includes(task.id) ? 'selected' : ''}`} key={task.id}>
        <label className="batch-check">
          <input type="checkbox" checked={selectedTaskIds.includes(task.id)} onChange={() => toggleTask(task.id)} />
        </label>
        <TaskCard
          task={task}
          hive={state.hives.find(hive => hive.id === task.hiveId)}
          onOpenHive={() => onOpenTask(task.id)}
          onComplete={() => onCompleteTask(task.id)}
        />
      </div>
    ));
  }

  return (
    <>
      <section className="work-hero work-hero-12">
        <div>
          <span>Centrum Prac 1.2</span>
          <h1>Dzisiejszy obchód</h1>
          <p>{stats.doneToday} wykonane, {stats.openToday} do zrobienia. Wreszcie plan dnia, a nie sterta cyfrowych wyrzutów sumienia.</p>
        </div>
        <div className="work-hero-badge">
          <strong>{stats.progress}%</strong>
          <small>postęp dnia</small>
        </div>
      </section>

      <div className="progress-bar"><span style={{ width: `${stats.progress}%` }} /></div>

      <div className="work-summary-grid">
        <div><strong>{todayTasks.length}</strong><span>dzisiaj</span></div>
        <div><strong>{buckets.overdue.length}</strong><span>zaległe</span></div>
        <div><strong>{buckets.urgent.length}</strong><span>pilne</span></div>
      </div>

      <button className="wide-action" onClick={() => onStartTour()}>▶ Rozpocznij obchód</button>
      <button className="wide-action" onClick={onCreateTask}>+ Dodaj zadanie</button>

      {selectedTaskIds.length > 0 && (
        <div className="card batch-bar">
          <strong>{selectedTaskIds.length} zaznaczonych</strong>
          <button className="mini-button" onClick={completeSelected}>✓ Oznacz jako wykonane</button>
        </div>
      )}

      <div className="form-card work-search-card">
        <label>
          Szukaj pracy, ula, pasieki, matki...
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="np. Ul 5, karmienie, Sklenar, Kolno" />
        </label>
      </div>

      <div className="filter-row work-filter-row">
        {(['all', 'inspection', 'feeding', 'queen', 'expansion', 'treatment', 'harvest', 'wintering', 'split', 'note', 'other'] as WorkFilter[]).map(item => (
          <button key={item} className={workFilter === item ? 'active' : ''} onClick={() => setWorkFilter(item)}>
            {item === 'all' ? 'Wszystkie' : workCategoryLabel(item)}
          </button>
        ))}
      </div>

      <div className="filter-row work-filter-row">
        {(['all', 'urgent', 'high', 'medium', 'low'] as Array<Priority | 'all'>).map(item => (
          <button key={item} className={priority === item ? 'active' : ''} onClick={() => setPriority(item)}>
            {item === 'all' ? 'Każdy priorytet' : item}
          </button>
        ))}
      </div>

      <Section title="Dzisiejszy obchód">
        {todayTasks.length === 0 ? <div className="empty-card">Brak prac na dziś. Podejrzane, ale przyjemne.</div> : renderTaskList(todayTasks)}
      </Section>

      {tasks.length === 0 ? (
        <div className="empty-card">Brak prac dla wybranego filtra.</div>
      ) : (
        <>
          {buckets.overdue.length > 0 && <Section title="Zaległe">{renderTaskList(buckets.overdue)}</Section>}

          <Section title="Według typu pracy">
            {workGroups.map(group => (
              <div className="card work-group-card" key={group.category}>
                <div className="work-group-head">
                  <strong>{group.icon} {group.label}</strong>
                  <span>{group.tasks.length} zadań</span>
                </div>
                {groupTasksByApiary(group.tasks, state.apiaries).map(apiaryGroup => (
                  <div className="work-apiary-block" key={apiaryGroup.apiary.id}>
                    <div className="work-apiary-head">
                      <strong>{apiaryGroup.apiary.name}</strong>
                      <button className="mini-button" onClick={() => onStartTour(apiaryGroup.apiary.id)}>Obchód</button>
                    </div>
                    {apiaryGroup.tasks.map(task => {
                      const hive = state.hives.find(item => item.id === task.hiveId);
                      return (
                        <button className="work-mini-task" key={task.id} onClick={() => onOpenTask(task.id)}>
                          <span>{hive?.name ?? 'Ul'}</span>
                          <small>{task.dueDate} · {task.priority}</small>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </Section>

          <Section title="Według pasieki">
            {apiaryGroups.map(group => (
              <div className="card work-group-card" key={group.apiary.id}>
                <div className="work-group-head">
                  <strong>🐝 {group.apiary.name}</strong>
                  <button className="mini-button" onClick={() => onStartTour(group.apiary.id)}>Obchód</button>
                </div>
                {renderTaskList(group.tasks)}
              </div>
            ))}
          </Section>
        </>
      )}
    </>
  );
}
