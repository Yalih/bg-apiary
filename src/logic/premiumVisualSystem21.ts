export const PREMIUM_VISUAL_SYSTEM_VERSION = '2.1-visualsystem';

export const premiumColors = {
  green900: '#0F3D2E',
  green800: '#124A38',
  green700: '#1E5B43',
  green500: '#2F7D5B',
  gold700: '#A57C2E',
  gold500: '#C99A2E',
  gold300: '#F4D47A',
  cream100: '#F7F5EE',
  cream200: '#EAE6DA',
  white: '#FFFFFF',
  graphite900: '#102820',
  graphite600: '#637069',
  danger: '#B42318',
  warning: '#A57C2E',
  success: '#0F6B46'
} as const;

export const premiumRadii = {
  xs: '10px',
  sm: '14px',
  md: '20px',
  lg: '28px',
  xl: '36px',
  pill: '999px'
} as const;

export const premiumShadows = {
  xs: '0 4px 12px rgba(15, 61, 46, .06)',
  sm: '0 10px 24px rgba(15, 61, 46, .09)',
  md: '0 18px 44px rgba(15, 61, 46, .13)',
  lg: '0 28px 70px rgba(15, 61, 46, .18)'
} as const;

export const premiumSpacing = {
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px'
} as const;

export const premiumTypography = {
  family: 'Manrope, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  h1: 'clamp(2.2rem, 8vw, 4.2rem)',
  h2: 'clamp(1.8rem, 5vw, 3rem)',
  h3: '1.3rem',
  body: '1rem',
  small: '.86rem',
  weightRegular: 500,
  weightMedium: 700,
  weightBold: 850
} as const;

export const premiumCardStyle = {
  radius: premiumRadii.lg,
  shadow: premiumShadows.sm,
  background: premiumColors.white,
  border: '1px solid rgba(15, 61, 46, .11)'
} as const;
