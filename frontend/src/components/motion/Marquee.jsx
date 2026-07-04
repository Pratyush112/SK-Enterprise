import React from 'react';

const Marquee = ({
  children,
  speed = 40, // seconds for full loop
  reverse = false,
  pauseOnHover = true,
  className = '',
  itemClassName = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden flex w-full select-none ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div
        className={`flex min-w-full shrink-0 items-center justify-around gap-12 py-4 ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        }`}
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex min-w-full shrink-0 items-center justify-around gap-12 py-4 ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        }`}
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0%); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
