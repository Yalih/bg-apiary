import { describe, expect, it } from 'vitest';
import { createCloudUserProfile, enableProvider, markEmailVerified, preparePasswordReset } from '../logic/auth20';

describe('auth 2.0', () => {
  it('creates production-ready cloud profile', () => {
    let profile = createCloudUserProfile('pawel@example.com', 'Paweł');
    expect(profile.status).toBe('email_pending');
    profile = markEmailVerified(profile);
    expect(profile.emailVerified).toBe(true);
    expect(profile.status).toBe('active');
    expect(preparePasswordReset(profile).passwordResetReady).toBe(true);
  });

  it('prepares Google and Apple provider architecture', () => {
    let profile = createCloudUserProfile('pawel@example.com', 'Paweł');
    profile = enableProvider(profile, 'google');
    profile = enableProvider(profile, 'apple');
    expect(profile.googleReady).toBe(true);
    expect(profile.appleReady).toBe(true);
  });
});
