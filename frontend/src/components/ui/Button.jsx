import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-container text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
    outline: 'border-2 border-outline/30 hover:border-primary text-on-surface dark:text-white hover:text-primary bg-transparent',
    ghost: 'hover:bg-surface-container dark:hover:bg-slate-800 text-on-surface dark:text-slate-200',
    danger: 'bg-error hover:bg-red-700 text-white shadow-sm'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs sm:text-sm',
    md: 'px-5 py-2.5 text-sm sm:text-base',
    lg: 'px-7 py-3.5 text-base sm:text-lg'
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
