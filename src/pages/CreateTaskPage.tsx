import { useMemo, useState } from 'react';
import type { ApiaryState, Priority, Task, TaskTargetAction, TaskType, WorkCategory } from '../models/apiary';
import { buildTaskFromForm, validateTaskForm, type TaskForm } from '../logic/taskForms';
import { getTargetActionForType, getTaskTypeLabel, getWorkCategoryForType } from '../logic/tasks';
import { Section } from '../components/Section';

interface CreateTaskPageProps {
  state: ApiaryState;
  hiveId?: string;
  onCancel: () => void;
  onCreate: (task: Task) => void;
}

const taskTypes: TaskType[] = ['inspection', 'feeding', 'queen', 'treatment', 'expansion', 'harvest', 'wintering', 'note', 'other'];
const priorities: Priority[] = ['urgent', 'high', 'medium', 'low'];
const workCategories: WorkCategory[] = ['inspection','feeding','queen','expansion','treatment','harvest','wintering','split','note','other'];

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function CreateTaskPage({ state, hiveId, onCancel, onCreate }: CreateTaskPageProps) {
  const defaultHive = state.hives.find(hive => hive.id === hiveId) ?? state.hives[0];
  const [form, setForm] = useState<TaskForm>({
    apiaryId: defaultHive?.apiaryId ?? state.apiaries[0]?.id ?? '',
    hiveId: defaultHive?.id ?? '',
    type: 'inspection',
    title: 'Nowe zadanie',
    dueDate: today(),
    priority: 'medium',
    description: '',
    targetAction: 'inspection',
    workCategory: 'inspection'
  });
  const [errors, setErrors] = useState<string[]>([]);

  const availableHives = useMemo(() => state.hives.filter(hive => hive.apiaryId === form.apiaryId), [state.hives, form.apiaryId]);

  function update<K extends keyof TaskForm>(key: K, value: TaskForm[K]) {
    setForm(current => {
      const next = { ...current, [key]: value };
      if (key === 'apiaryId') {
        const firstHive = state.hives.find(hive => hive.apiaryId === value);
        next.hiveId = firstHive?.id ?? '';
      }
      if (key === 'type') {
        next.targetAction = getTargetActionForType(value as TaskType);
        next.workCategory = getWorkCategoryForType(value as TaskType);
        next.title = getTaskTypeLabel(value as TaskType);
      }
      return next;
    });
  }

  function submit() {
    const nextErrors = validateTaskForm(form);
    setErrors(nextErrors);
    if (nextErrors.length > 0) return;
    onCreate(buildTaskFromForm(form));
  }

  return (
    <>
      <button className="back-button" onClick={onCancel}>‹ Anuluj</button>
      <div className="page-header">
        <span>Zadanie</span>
        <h1>Dodaj zadanie</h1>
        <p>Tworzymy robotę do wykonania, żeby potem aplikacja mogła ją bezlitośnie przypominać. Postęp.</p>
      </div>

      <Section title="Dane zadania">
        <div className="form-card">
          <label>
            Pasieka
            <select value={form.apiaryId} onChange={event => update('apiaryId', event.target.value)}>
              {state.apiaries.map(apiary => <option key={apiary.id} value={apiary.id}>{apiary.name}</option>)}
            </select>
          </label>

          <label>
            Ul
            <select value={form.hiveId} onChange={event => update('hiveId', event.target.value)}>
              {availableHives.map(hive => <option key={hive.id} value={hive.id}>{hive.name}</option>)}
            </select>
          </label>

          <label>
            Typ
            <select value={form.type} onChange={event => update('type', event.target.value as TaskType)}>
              {taskTypes.map(type => <option key={type} value={type}>{getTaskTypeLabel(type)}</option>)}
            </select>
          </label>

          <label>
            Tytuł
            <input value={form.title} onChange={event => update('title', event.target.value)} />
          </label>

          <div className="two-cols">
            <label>
              Termin
              <input type="date" value={form.dueDate} onChange={event => update('dueDate', event.target.value)} />
            </label>
            <label>
              Priorytet
              <select value={form.priority} onChange={event => update('priority', event.target.value as Priority)}>
                {priorities.map(priority => <option key={priority} value={priority}>{priority}</option>)}
              </select>
            </label>
          </div>

          <label>
            Po kliknięciu
            <select value={form.targetAction} onChange={event => update('targetAction', event.target.value as TaskTargetAction)}>
              <option value="open_hive">Otwórz ul</option>
              <option value="inspection">Otwórz przegląd</option>
              <option value="feeding">Otwórz karmienie</option>
              <option value="note">Otwórz notatkę</option>
              <option value="queen_replacement">Wymień matkę</option>
            </select>
          </label>

          <label>
            Kategoria pracy
            <select value={form.workCategory ?? getWorkCategoryForType(form.type)} onChange={event => update('workCategory', event.target.value as WorkCategory)}>
              {workCategories.map(category => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>

          <label>
            Opis
            <textarea value={form.description} onChange={event => update('description', event.target.value)} />
          </label>

          {errors.length > 0 && <div className="form-errors">{errors.map(error => <p key={error}>{error}</p>)}</div>}

          <button className="primary full" onClick={submit}>Zapisz zadanie</button>
        </div>
      </Section>
    </>
  );
}
