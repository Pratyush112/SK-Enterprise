import React from 'react';

export const Section = ({
  children,
  className = '',
  containerClassName = '',
  id,
  ...props
}) => {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`} {...props}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};
