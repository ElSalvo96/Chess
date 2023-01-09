const plugin = require('tailwindcss/plugin');

const safelist = [];
const cellPosition = {};
const collLetters = 'ABCDEFGH'.split('');
collLetters.forEach((collLetter, collNumber) => {
  '12345678'.split('').forEach((row) => {
    const className = `.cell-${collLetter}${row}`;
    safelist.push(className);
    cellPosition[className] = {
      transform: `translate(${collNumber * 100}%,${Math.abs(row - 8) * 100}%)`
    };
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  safelist,
  theme: {
    extend: {
      height: {
        'vh-5': 'calc(100vh - 5rem)',
        'vw-5': 'calc(100vw - 5rem)',
        '1/8': '12.5%'
      },
      width: {
        'vh-5': 'calc(100vh - 5rem)',
        'vw-5': 'calc(100vw - 5rem)',
        '1/8': '12.5%'
      },
      backgroundImage: {
        'Chessboard-1': "url('./images/Chessboard-1.svg')"
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const utilities = {
        '.cell-content': {
          overflow: 'hidden',
          'touch-action': 'none',
          /* width: 12.5%; */
          'will-change': 'transform',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)'
        },
        '.piece-border': {
          fill: 'none',
          stroke: '#000000',
          'stroke-width': '14px',
          'stroke-dasharray': '0',
          'stroke-linejoin': 'round'
        },
        '.DELETE': {
          transform: `translate(-200%,-200%)`,
          opacity: 0
        },
        ...cellPosition
      };
      addUtilities(utilities);
    })
  ]
};
