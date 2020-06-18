import styled from 'styled-components';
import { motion } from 'framer-motion';

export const H1 = styled(motion.h1)`
  font-size: ${props => props.fs || props.theme.fonts.fs_h1};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.fs || props.theme.fonts.fs_h1_lg};
  }
`;
export const H2 = styled(motion.h2)`
  font-size: ${props => props.fs || props.theme.fonts.fs_h2};
  margin: .75em 0;
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.fs || props.theme.fonts.fs_h2_lg};
  }
  font-family: ${props => props.secondary ? props.theme.fonts.ff_secondary : props.theme.fonts.ff_primary};
`;
export const H3 = styled(motion.h3)`
  font-size: ${props => props.fs || props.theme.fonts.fs_h3};
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.fs || props.theme.fonts.fs_h3_lg};
  }
`;