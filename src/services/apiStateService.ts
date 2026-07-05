import type { Apiary, Hive } from '../models/apiary';
import { listApiaries } from '../api/apiaryApi';
import { listHives } from '../api/hiveApi';

export interface RemoteApiaryStateSlice {
  apiaries: Apiary[];
  hives: Hive[];
}

export async function loadRemoteApiaryState(): Promise<RemoteApiaryStateSlice> {
  const [apiaries, hives] = await Promise.all([listApiaries(), listHives()]);
  return { apiaries, hives };
}
