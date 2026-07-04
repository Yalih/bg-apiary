import type { AuthProvider, CloudUserProfile } from '../models/apiary';

export function createCloudUserProfile(email: string, displayName: string, provider: AuthProvider = 'email'): CloudUserProfile {
  const now = new Date().toISOString();
  return {
    id: `cloud-user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    email,
    displayName,
    provider,
    status: provider === 'email' ? 'email_pending' : 'local_ready',
    emailVerified: false,
    passwordResetReady: true,
    googleReady: provider === 'google',
    appleReady: provider === 'apple',
    createdAt: now,
    updatedAt: now
  };
}

export function markEmailVerified(profile: CloudUserProfile): CloudUserProfile {
  return { ...profile, emailVerified: true, status: 'active', updatedAt: new Date().toISOString() };
}

export function preparePasswordReset(profile: CloudUserProfile): CloudUserProfile {
  return { ...profile, passwordResetReady: true, updatedAt: new Date().toISOString() };
}

export function enableProvider(profile: CloudUserProfile, provider: AuthProvider): CloudUserProfile {
  return {
    ...profile,
    provider,
    googleReady: profile.googleReady || provider === 'google',
    appleReady: profile.appleReady || provider === 'apple',
    updatedAt: new Date().toISOString()
  };
}
