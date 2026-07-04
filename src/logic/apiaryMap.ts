import type { Hive, MapPosition } from '../models/apiary';

export function getHiveMapPosition(hive: Hive): MapPosition {
  if (hive.mapPosition) return hive.mapPosition;
  const index = Math.max(0, hive.number - 1);
  return {
    row: Math.floor(index / 4) + 1,
    column: (index % 4) + 1
  };
}

export function buildApiaryMap(hives: Hive[]): { row: number; hives: Hive[] }[] {
  const sorted = [...hives].sort((a, b) => {
    const pa = getHiveMapPosition(a);
    const pb = getHiveMapPosition(b);
    return pa.row === pb.row ? pa.column - pb.column : pa.row - pb.row;
  });

  const rows = new Map<number, Hive[]>();
  sorted.forEach(hive => {
    const row = getHiveMapPosition(hive).row;
    rows.set(row, [...(rows.get(row) ?? []), hive]);
  });

  return [...rows.entries()].map(([row, rowHives]) => ({ row, hives: rowHives }));
}
