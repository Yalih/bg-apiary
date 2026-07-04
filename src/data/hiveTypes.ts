export const HIVE_TYPES = [
  'Warszawski Poszerzany',
  'Warszawski Zwykły',
  'Dadant 10',
  'Dadant 12',
  'Dadant Burnat',
  'Dadant Łysoń',
  'Dadant drewniany',
  'Dadant styropianowy',
  'Wielkopolski',
  'Langstroth',
  'Ostrowskiej',
  'Apipol',
  'Inny'
] as const;

export type HiveType = typeof HIVE_TYPES[number];
