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


export const ItemIcon = styled.img`
height: 80px;
width: 80px;
border: 2px solid ${props => props.isMasterworked ? 'gold' : 'white'};
margin: ${props => props.centered && '0 auto'};
`;

export const ItemWrapper = styled.div`
  display: grid;
  gap: 0 .25rem;
  grid-template-columns: 1fr 2fr 1fr;
  margin: 0 .5rem 3rem;
  p {
    margin: 0;
    text-transform: capitalize;
  }
  .full-span {
    grid-column: 1 / -1;
  }
`;

export const TitleCard = styled(motion.div)`
  text-align: center;
  margin: 2rem;
`;