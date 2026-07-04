import type { PermissionAction, PermissionModule, PermissionRule, SharedApiaryMember, SharedRole } from '../models/apiary';

const ROLE_ACTIONS: Record<SharedRole, PermissionAction[]> = {
  administrator: ['read', 'write', 'delete'],
  manager: ['read', 'write'],
  pracownik: ['read', 'write'],
  obserwator: ['read']
};

export const DEFAULT_PERMISSION_MODULES: PermissionModule[] = ['apiaries', 'hives', 'tasks', 'reports', 'inventory', 'honey', 'health', 'season', 'assistant', 'backup', 'sharing'];

export function buildDefaultPermissionRules(): PermissionRule[] {
  return (['administrator', 'manager', 'pracownik', 'obserwator'] as SharedRole[]).flatMap(role =>
    DEFAULT_PERMISSION_MODULES.map(module => ({
      role,
      module,
      actions: module === 'sharing' && role !== 'administrator' ? ['read'] : ROLE_ACTIONS[role]
    }))
  );
}

export function canAccess(rules: PermissionRule[], role: SharedRole, module: PermissionModule, action: PermissionAction): boolean {
  return rules.find(rule => rule.role === role && rule.module === module)?.actions.includes(action) ?? false;
}

export function createSharedMember(apiaryId: string, userEmail: string, role: SharedRole): SharedApiaryMember {
  return {
    id: `shared-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    apiaryId,
    userEmail,
    role,
    invitedAt: new Date().toISOString(),
    status: 'zaproszony'
  };
}

export function acceptInvite(member: SharedApiaryMember): SharedApiaryMember {
  return { ...member, status: 'aktywny', acceptedAt: new Date().toISOString() };
}
