import { beforeEach, describe, expect, it, vi } from 'vitest';
import { registerUser, logoutUser } from '../auth/auth';
import { loadStateForUser, saveStateForUser } from '../storage/localStore';
import { createEmptyState } from '../storage/emptyState';
import { demoState } from '../data/demoData';
import { deleteApiaryData, deleteHiveData, clearUserData } from '../logic/dataManagement';
import { createBackup, restoreBackup } from '../logic/backup';

const store = new Map<string, string>();

beforeEach(() => {
  store.clear();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear()
  });
  vi.stubGlobal('confirm', () => true);
});

describe('real user storage 1.5 RC', () => {
  it('new user starts with empty state', () => {
    const user = registerUser({ name: 'Nowy', email: 'nowy@test.pl', password: '1234', repeatPassword: '1234' }).user!;
    const state = loadStateForUser(user.id);

    expect(state.apiaries).toHaveLength(0);
    expect(state.hives).toHaveLength(0);
    expect(state.tasks).toHaveLength(0);
    expect(state.inspections).toHaveLength(0);
  });

  it('separates user data', () => {
    const userA = registerUser({ name: 'A', email: 'a@test.pl', password: '1234', repeatPassword: '1234' }).user!;
    saveStateForUser(userA.id, { ...createEmptyState(), apiaries: [{ id: 'a1', name: 'A', location: 'A', description: '', imageEmoji: '🐝' }] });
    logoutUser();

    const userB = registerUser({ name: 'B', email: 'b@test.pl', password: '1234', repeatPassword: '1234' }).user!;
    const stateB = loadStateForUser(userB.id);

    expect(loadStateForUser(userA.id).apiaries).toHaveLength(1);
    expect(stateB.apiaries).toHaveLength(0);
  });

  it('deletes hive with all linked data', () => {
    const hiveId = demoState.hives[0].id;
    const updated = deleteHiveData(demoState, hiveId);

    expect(updated.hives.some(hive => hive.id === hiveId)).toBe(false);
    expect(updated.tasks.some(task => task.hiveId === hiveId)).toBe(false);
    expect(updated.inspections.some(item => item.hiveId === hiveId)).toBe(false);
    expect(updated.feedings.some(item => item.hiveId === hiveId)).toBe(false);
  });

  it('deletes apiary with hives and linked data', () => {
    const apiaryId = demoState.apiaries[0].id;
    const hiveIds = demoState.hives.filter(hive => hive.apiaryId === apiaryId).map(hive => hive.id);
    const updated = deleteApiaryData(demoState, apiaryId);

    expect(updated.apiaries.some(apiary => apiary.id === apiaryId)).toBe(false);
    expect(updated.hives.some(hive => hive.apiaryId === apiaryId)).toBe(false);
    expect(updated.tasks.some(task => hiveIds.includes(task.hiveId))).toBe(false);
  });

  it('clears user data to empty state', () => {
    const empty = clearUserData();

    expect(empty.apiaries).toHaveLength(0);
    expect(empty.hives).toHaveLength(0);
    expect(empty.tasks).toHaveLength(0);
  });

  it('imports backup into current account data shape', () => {
    const backup = createBackup(demoState);
    const restored = restoreBackup(backup);

    expect(restored.apiaries.length).toBeGreaterThan(0);
    expect(restored.hives.length).toBeGreaterThan(0);
  });
});
