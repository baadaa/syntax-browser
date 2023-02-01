import * as React from 'react';

export const IconSearch: React.FC<React.SVGAttributes<SVGAElement>> = () => (
  <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="11.5" stroke="white" strokeWidth="5" />
    <line
      x1="23.5355"
      y1="24"
      x2="31"
      y2="31.4645"
      stroke="white"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

export const IconCancel: React.FC<React.SVGAttributes<SVGAElement>> = () => (
  <svg viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      stroke="#000"
      strokeWidth="5"
      strokeLinecap="round"
      d="m2.5 3 17.7 17.7M20.5 3 2.8 20.7"
    />
  </svg>
);
