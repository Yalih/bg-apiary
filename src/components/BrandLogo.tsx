interface BrandLogoProps {
  variant?: 'horizontal' | 'mark' | 'stacked';
  tone?: 'dark' | 'light';
  className?: string;
}

export function BrandLogo({ variant = 'horizontal', tone = 'dark', className = '' }: BrandLogoProps) {
  const source = variant === 'mark'
    ? '/brand/logo-mark.svg'
    : variant === 'stacked'
      ? '/brand/logo-stacked.svg'
      : tone === 'light'
        ? '/brand/logo-horizontal-light.svg'
        : '/brand/logo-horizontal-dark.svg';

  return <img className={`brand-logo brand-logo-${variant} ${className}`} src={source} alt="BG Apiary" loading="eager" />;
}
