import { useState } from 'react';
import type { ApiaryState } from '../models/apiary';
import { Section } from '../components/Section';
import { TaskCard } from '../components/TaskCard';
import { buildReminderSummary } from '../logic/reminders';
import { getOpenTasks, getUrgentTasks, isTaskDueToday, isTaskOverdue } from '../logic/tasks';

interface TasksPageProps {
  state: ApiaryState;
  onOpenHive: (hiveId: string) => void;
  onOpenTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onCreateTask: () => void;
}

type Filter = 'all' | 'today' | 'urgent' | 'inspection' | 'feeding' | 'queen';

const filterLabels: Record<Filter, string> = {
  all: 'Wszystkie',
  today: 'Dzisiaj',
  urgent: 'Pilne',
  inspection: 'Przeglądy',
  feeding: 'Karmienie',
  queen: 'Matki'
};

export function TasksPage({ state, onOpenTask, onCompleteTask, onCreateTask }: TasksPageProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const openTasks = getOpenTasks(state.tasks);
  const reminders = buildReminderSummary(state.tasks);
  let tasks = openTasks;

  if (filter === 'today') tasks = tasks.filter(task => isTaskDueToday(task));
  if (filter === 'urgent') tasks = getUrgentTasks(state.tasks);
  if (filter === 'inspection') tasks = tasks.filter(task => task.type === 'inspection');
  if (filter === 'feeding') tasks = tasks.filter(task => task.type === 'feeding');
  if (filter === 'queen') tasks = tasks.filter(task => task.type === 'queen');

  const overdueTasks = tasks.filter(task => isTaskOverdue(task));
  const todayTasks = tasks.filter(task => !isTaskOverdue(task) && isTaskDueToday(task));
  const laterTasks = tasks.filter(task => !isTaskOverdue(task) && !isTaskDueToday(task));

  function renderTasks(list: typeof tasks) {
    return list.map(task => (
      <TaskCard
        key={task.id}
        task={task}
        hive={state.hives.find(hive => hive.id === task.hiveId)}
        onOpenHive={() => onOpenTask(task.id)}
        onComplete={() => onCompleteTask(task.id)}
      />
    ));
  }

  return (
    <>
      <div className="page-header tasks-page-header">
        <span>Zadania</span>
        <h1>Plan pracy</h1>
        <p>{reminders.morning}</p>
      </div>

      <div className="task-summary-grid">
        <div><strong>{openTasks.length}</strong><span>otwarte</span></div>
        <div><strong>{reminders.todayCount}</strong><span>dzisiaj</span></div>
        <div><strong>{reminders.overdueCount}</strong><span>zaległe</span></div>
      </div>

      <button className="wide-action" onClick={onCreateTask}>+ Dodaj zadanie</button>

      <div className="filter-row task-filter-row">
        {(['all', 'today', 'urgent', 'inspection', 'feeding', 'queen'] as Filter[]).map(item => (
          <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{filterLabels[item]}</button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <div className="empty-card task-empty">Brak zadań w tym filtrze. Rzadki luksus, nie zmarnuj go.</div>
      ) : (
        <>
          {overdueTasks.length > 0 && <Section title="Zaległe">{renderTasks(overdueTasks)}</Section>}
          {todayTasks.length > 0 && <Section title="Dzisiaj">{renderTasks(todayTasks)}</Section>}
          {laterTasks.length > 0 && <Section title="Najbliższe">{renderTasks(laterTasks)}</Section>}
        </>
      )}
    </>
  );
}
