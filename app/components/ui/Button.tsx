import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#1450F5] text-white border-2 border-[#1450F5] hover:bg-[#0E3DD4] hover:border-[#0E3DD4] active:bg-[#0B2FA8] active:border-[#0B2FA8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1450F5] focus-visible:ring-offset-2',
  secondary:
    'bg-transparent text-[#1450F5] border-2 border-[#1450F5] hover:bg-[#E8EEFE] active:bg-[#d0dafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1450F5] focus-visible:ring-offset-2',
  ghost:
    'bg-transparent text-[#0F1430] border-2 border-[#0F1430] hover:bg-[#0F1430] hover:text-white active:bg-[#1a1a2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1430] focus-visible:ring-offset-2',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  external = false,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-150 cursor-pointer outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={combinedStyles}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {children}
    </button>
  );
}
