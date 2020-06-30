import styled from 'styled-components';
import { motion } from 'framer-motion';


export const ItemWrapper = styled(motion.section)`
  background: ${props => props.background || props.theme.background};
  margin-bottom: 1rem;
  &.isExpanded {
    background: linear-gradient(to bottom, ${props => props.theme.background}, #33333333);
  }
`;