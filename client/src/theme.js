import { css } from 'styled-components';



const wrapNumber = (min, max, num) => {
  const rangeSize = max - min;
  return ((((num - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

// START OF MIXIN THING THAT I DON'T QUITE LIKE SO MUCH YET
// this works ok as a mixin, but I find that it's less readable than using breakpoints via theme
// from within a regularily written media query. Leaving it in for now for something to reference some day.
// Could be a little better off just exporting this separately, but I like having everything in the theme,
// instead of having to import another thing into a component
const breakpoints = {
  sm: '768px',
  med: '992px',
  lg: '1200px'
};

export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media screen and (min-width: ${breakpoints[label]}){
      ${css(...args)};
    }
    `;
  return acc;
}, {});

// END OF MIXIN THING THAT I DON'T QUITE LIKE SO MUCH YET.

const mw_gradient = `linear-gradient(125deg, #DFBD38 30%, #FFECB9 50%, #DFBD38 70%);`;


const colors = {
  livingCoral: '#FF6F61',
  ultraViolet: '#6B5B95',
  greenery: '#88B04B',
  roseQuartz: '#F7CAC9',
  serenity: '#92A8D1',
  marsala: '#955251',
  radiandOrchid: '#B565A7',
  emerald: '#009B77',
  tangerineTango: '#DD4124',
  honeysuckle: '#D65076',
  turquoise: '#45B8AC',
  mimosa: '#EFC050',
  blueIzis: '#5B5EA6',
  chiliPepper: '#9B2335',
  sandDollar: '#DFCFBE',
  blueTurquoise: '#55B4B0',
  tigerlily: '#E15D44',
  aquaSky: '#7FCDCD',
  trueRed: '#BC243C',
  fuschiaRose: '#C3447A',
  ceruleanBlue: '#98B4D4',
  slateGray: '#708090',
  black: '#333333',
  light: '#ffffff',
  dark: '#121212',
  lightBg: '#ffffff22',
  void: '#9c7bb5',
  arc: '#82aac9',
  solar: '#ed591e',
  powerGold: '#ddc918',
};


// Correspond color values to the energyType enum values.
const energyColors = {
  1: colors.arc,
  2: colors.solar,
  3: colors.void,
}

// An array of the Pantone color values for randomizing and fun and profit.
const colorsArray = [
  '#FF6F61',
  '#6B5B95',
  '#88B04B',
  '#F7CAC9',
  '#92A8D1',
  '#955251',
  '#B565A7',
  '#009B77',
  '#DD4124',
  '#D65076',
  '#45B8AC',
  '#EFC050',
  '#5B5EA6',
  '#9B2335',
  '#DFCFBE',
  '#55B4B0',
  '#E15D44',
  '#7FCDCD',
  '#BC243C',
  '#C3447A',
  '#98B4D4',
  '#708090',];

const cycledColor = function (i) { return colorsArray[wrapNumber(0, colorsArray.length, i)] };

const fonts = {
  ff_primary: `'Baloo Paaji 2', cursive`,
  ff_secondary: `'Special Elite', cursive`,
  fw_reg: 400,
  fw_bold: 700,
  fs_h1: '3rem',
  fs_h2: '2.25rem',
  fs_h3: '1.25rem',
  fs_body: '1rem',
  fs_h1_lg: '4.5rem',
  fs_h2_lg: '3.75rem',
  fs_h3_lg: '1.5rem',
  fs_body_lg: '1.125rem'
};

export const lightTheme = {
  mode: 'light',
  body: colors.light,
  background: colors.light,
  color: colors.dark,
  btn: {
    bg: colors.fuschiaRose,
  },
  breakpoints,
  colors,
  colorsArray,
  cycledColor,
  energyColors,
  fonts,
  media,
  mw_gradient,
};

export const darkTheme = {
  mode: 'dark',
  body: colors.dark,
  background: colors.lightBg,
  color: colors.light,
  btn: {
    bg: colors.fuschiaRose,
  },
  breakpoints,
  colors,
  colorsArray,
  cycledColor,
  energyColors,
  fonts,
  media,
  mw_gradient,
}


