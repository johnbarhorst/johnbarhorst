import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
html {
   box-sizing: border-box;
}

*,
*:before,
*:after {
   box-sizing: inherit;
}

body {
   margin: 0;
   line-height: 1.6;
   font-family: 'Baloo Paaji 2', cursive;
   font-size: 1rem;
   background: ${props => props.theme.body};
   color: ${props => props.theme.color};
   transition: all .5s linear;
}

img {
  display: block;
  max-width: 100%;
}

h1,
h2,
h3 {
  margin: 0;
  line-height: 1.1;
}

a {
  text-decoration: none;
  color: ${props => props.theme.color};
}
`;