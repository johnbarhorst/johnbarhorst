import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled(motion.div)`
  background: ${props => props.background || props.theme.background};
  padding: 20px;
  border-radius: 15px;
  box-shadow: 1px 1px 15px rgba(0,0,0,0.4);
  opacity: ${props => props.opacity || 1};
`;