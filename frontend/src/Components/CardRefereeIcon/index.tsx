import { FC } from 'react';

interface CardRefereeProps {
  color: string;
  height?: string;
  width?: string;
}

export const CardRefereeIcon: FC<CardRefereeProps> = ({ color, height = '20px', width = '20px' }) => (
  <svg
    style={{ paddingTop: 4 }}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width={width}
    height={height}
    viewBox="0 0 256 256"
    xmlSpace="preserve"
  >
    <defs></defs>
    <g
      style={{
        stroke: 'none',
        strokeWidth: 0,
        strokeDasharray: 'none',
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeMiterlimit: 10,
        fill: 'none',
        fillRule: 'nonzero',
        opacity: 1,
      }}
      transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
    >
      <path
        d="M 54.932 62.504 c 3.739 0 6.771 -3.031 6.771 -6.771 V 6.771 C 61.703 3.031 58.672 0 54.932 0 H 36.04 c -4.052 0 -7.337 3.285 -7.337 7.337 v 47.829 c 0 4.052 3.285 7.337 7.337 7.337"
        style={{
          stroke: 'none',
          strokeWidth: 1,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: color,
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform=" matrix(1 0 0 1 0 0) "
        strokeLinecap="round"
      />
      <path
        d="M 29.703 55.167 V 7.337 C 29.703 3.285 32.988 0 37.04 0 h -8.669 c -4.052 0 -7.337 3.285 -7.337 7.337 v 47.829 c 0 4.052 3.285 7.337 7.337 7.337 h 8.669 C 32.988 62.504 29.703 59.219 29.703 55.167 z"
        style={{
          stroke: 'none',
          strokeWidth: 1,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: color,
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform=" matrix(1 0 0 1 0 0) "
        strokeLinecap="round"
      />
      <path
        d="M 56.358 62.491 l -9.951 0.013 l -1.841 -11.575 c -0.495 -3.115 -3.449 -5.259 -6.565 -4.763 c -0.432 0.069 -0.843 0.189 -1.233 0.346 c -0.33 0.941 -1.935 1.809 -1.769 2.858 l 3.257 20.11 c 0.792 4.45 3.371 8.617 6.587 12.481 c 1.49 2.223 1.068 5.008 1.725 8.04 l 10 0 L 56.358 62.491 z"
        style={{
          stroke: 'none',
          display: 'none',
          strokeWidth: 1,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: 'rgb(253,218,170)',
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform=" matrix(1 0 0 1 0 0) "
        strokeLinecap="round"
      />
      <path
        d="M 39.669 69.491 l -3.174 -19.958 c -0.167 -1.049 -0.057 -2.081 0.273 -3.022 c -2.424 0.976 -3.957 3.535 -3.53 6.219 l 2.923 18.381 c 0.729 4.098 2.856 7.859 5.818 11.417 c 1.372 2.047 2.144 4.679 2.75 7.471 h 4.243 c -0.658 -3.032 -1.496 -5.889 -2.986 -8.112 C 42.77 78.024 40.461 73.941 39.669 69.491 z"
        style={{
          stroke: 'none',
          display: 'none',
          strokeWidth: 1,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: 'rgb(254,196,120)',
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform=" matrix(1 0 0 1 0 0) "
        strokeLinecap="round"
      />
    </g>
  </svg>
);
