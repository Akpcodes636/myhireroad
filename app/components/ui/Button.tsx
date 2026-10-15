
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
    'bg-[#38BDF8] text-[#0E1C49] border-2 border-[#38BDF8] hover:bg-[#7DD3FC] hover:border-[#7DD3FC] active:bg-[#0EA5E9] active:border-[#0EA5E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2',

  secondary:
    'bg-transparent text-[#0E1C49] border-2 border-[#0E1C49] hover:bg-[#E0F2FE] active:bg-[#BAE6FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2',

  ghost:
    'bg-transparent text-[#0E1C49] border-2 border-transparent hover:bg-[#F8FAFC] active:bg-[#E0F2FE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2',
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

  const combinedStyles =
    `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={combinedStyles}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={disabled ? (event) => event.preventDefault() : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={combinedStyles}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (event) => event.preventDefault() : undefined}
      >
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
