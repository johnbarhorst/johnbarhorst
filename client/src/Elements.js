import styled from 'styled-components';
import { motion } from 'framer-motion';

export const H1 = styled(motion.h1)`
  font-size: ${props => props.size || props.theme.fonts.fs_h1};
`;
export const H2 = styled(motion.h1)`
  font-size: ${props => props.size || props.theme.fonts.fs_h2};
`;

export const Card = styled(motion.div)`
  padding: 20px;
  border-radius: 15px;
  box-shadow: 1px 1px 15px rgba(0,0,0,0.4);
  opacity: ${props => props.opacity ? props.opacity : 1};
`;

export const AnimatedButton = styled(motion.button)`
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid #999;
  padding: 5px 20px;
`;

export const Form = styled.form`
font-size: 30px;
text-align: center;
margin-bottom: 30px;

input {
padding: 5px 10px;
font-size: 20px;
border-radius: 5px;
border: 1px solid #999;
vertical-align: middle;
margin: 0 20px;
}
`;