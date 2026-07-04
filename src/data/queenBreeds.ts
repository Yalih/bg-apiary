export const QUEEN_BREEDS = [
  'Krainka',
  'Buckfast',
  'Kaukaska',
  'Carnica',
  'Mieszaniec',
  'Inna'
] as const;

export type QueenBreed = typeof QUEEN_BREEDS[number];

export const QUEEN_LINES: Record<string, string[]> = {
  Krainka: [
    'Sklenar G10',
    'Sklenar H47',
    'Sklenar A2',
    'Sklenar 47',
    'Sklenar 26',
    'Nieska',
    'Celle',
    'Hinderhofer',
    'Singer',
    'Peschetz',
    'Troiseck',
    'Rosa',
    'Vigorka',
    'Prima',
    'Victoria',
    'Kortówka',
    'Alpejka',
    'Dobra',
    'Inna'
  ],
  Carnica: [
    'Sklenar G10',
    'Sklenar H47',
    'Sklenar A2',
    'Sklenar 47',
    'Sklenar 26',
    'Nieska',
    'Celle',
    'Hinderhofer',
    'Singer',
    'Peschetz',
    'Troiseck',
    'Rosa',
    'Vigorka',
    'Prima',
    'Victoria',
    'Kortówka',
    'Alpejka',
    'Dobra',
    'Inna'
  ],
  Buckfast: [
    'B13',
    'B24',
    'B54',
    'Elgon',
    'Primorska',
    'Karol Gajda',
    'Czarna',
    'Inseminowana',
    'Inna'
  ],
  Kaukaska: [
    'Kaukaska czysta',
    'Kaukaska selekcyjna',
    'Kaukaska łagodna',
    'Inna'
  ],
  Mieszaniec: [
    'Własna',
    'Nieznana',
    'Inna'
  ],
  Inna: [
    'Własna',
    'Nieznana',
    'Inna'
  ]
};

export function getAvailableQueenLines(breed: string): string[] {
  return QUEEN_LINES[breed] ?? QUEEN_LINES.Inna;
}
