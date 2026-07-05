export const USER_ROLES = ['ADMIN', 'BEEKEEPER', 'OBSERVER'] as const;
export type UserRole = (typeof USER_ROLES)[number];
