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

export const Card = styled(motion.div)`
  background: ${props => props.background || props.theme.background};
  padding: 20px;
  border-radius: 15px;
  box-shadow: 1px 1px 15px rgba(0,0,0,0.4);
  opacity: ${props => props.opacity || 1};
`;

export const AnimatedButton = styled(motion.button)`
  background: ${props => props.bg || props.theme.btn.bg};
  font-size: ${props => props.fs || `20px`};
  border-radius: 5px;
  border: 1px solid ${props => props.borderColor || '#909090'};;
  padding: 5px 20px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.4);
`;

export const Form = styled.form`
  font-size: 30px;
  text-align: center;
  margin-bottom: 30px;

  input {
  background: ${props => props.theme.background};
  padding: 5px 10px;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid #999;
  vertical-align: middle;
  margin: 0 20px;
  }
`;

export const Wrapper = styled(motion.div)`
`;


