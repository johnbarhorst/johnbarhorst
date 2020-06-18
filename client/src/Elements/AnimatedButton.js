import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AnimatedButton = styled(motion.button)`
  background: ${props => props.bg || props.theme.btn.bg};
  font-size: ${props => props.fs || `20px`};
  border-radius: 5px;
  border: 1px solid ${props => props.borderColor || '#909090'};;
  padding: 5px 20px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.4);
`;