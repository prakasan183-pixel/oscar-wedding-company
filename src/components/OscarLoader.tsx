import React from 'react';

export const OscarLoader: React.FC = () => (
  <div className="oscar-loader" role="status" aria-label="Oscar Wedding Company loading">
    <svg viewBox="0 0 44 54" fill="none" aria-hidden="true">
      <path pathLength="360" d="M22 3.5C10 3.5 3.5 10.5 3.5 27S10 50.5 22 50.5 40.5 43.5 40.5 27 34 3.5 22 3.5Z" className="oscar-loader-dash" />
    </svg>
    <svg viewBox="0 0 44 54" fill="none" aria-hidden="true">
      <path pathLength="360" d="M36 10C31 4 24 3 17 4C8 5 4 10 5 17C6 24 15 26 23 28C31 30 38 33 37 40C36 48 27 51 18 49C11 48 6 44 3 40" className="oscar-loader-dash" />
    </svg>
    <svg viewBox="0 0 44 54" fill="none" aria-hidden="true">
      <path pathLength="360" d="M39 12C35 6 29 3.5 22 3.5C10 3.5 3.5 12 3.5 27S10 50.5 22 50.5C29 50.5 35 48 39 42" className="oscar-loader-dash" />
    </svg>
    <svg viewBox="0 0 44 54" fill="none" aria-hidden="true">
      <path pathLength="360" d="M3 50L18 7C19 4.5 21 3 22 3S25 4.5 26 7L41 50M10 32H34" className="oscar-loader-dash" />
    </svg>
    <svg viewBox="0 0 44 54" fill="none" aria-hidden="true">
      <path pathLength="360" d="M6 50V6H22C32 6 38 11 38 20S32 34 22 34H6M22 34L39 50" className="oscar-loader-dash" />
    </svg>
  </div>
);
