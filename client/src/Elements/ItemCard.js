import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ItemCard = styled(motion.div)`
  display: grid;
  gap: 0 .25rem;
  grid-template-columns: 1fr 2fr 1fr;
  padding: .5rem;
  p {
  margin: 0;
  text-transform: capitalize;
  }

  &.isExpanded {
    grid-template-columns: 80px 1fr;
    background-image: ${props => `url('http://www.bungie.net${props.background}')`};
    background-size: contain;
    background-repeat: no-repeat;
    .full-span {
      grid-column: 1 / -1;
    }
  }
`;

