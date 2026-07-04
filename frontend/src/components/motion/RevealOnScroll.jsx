import React, { useRef } from 'react';
import { useReveal } from '../../hooks/useReveal';

const RevealOnScroll = ({
  children,
  direction = 'up',
  duration = 0.8,
  delay = 0,
  distance = 40,
  stagger = 0,
  threshold = 0.15,
  once = true,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const ref = useRef(null);

  useReveal(ref, {
    direction,
    duration,
    delay,
    distance,
    stagger,
    threshold,
    once,
  });

  return (
    <Component ref={ref} className={className} {...props}>
      {children}
    </Component>
  );
};

export default RevealOnScroll;
