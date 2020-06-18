import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DetailsButton = styled(motion.button)`
  background: none;
  color: ${props => props.theme.color};
  border: none;
  outline: none;
  padding: 0.25rem .5rem;
  border-radius: 10px;
`;