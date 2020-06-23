import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ItemCard = styled(motion.div)`
  ${props => props.background && `background-image: url('http://www.bungie.net${props.background}');
  background-size: cover;
  background-repeat: no-repeat;`}
  display: grid;
  gap: 0 .25rem;
  grid-template-columns: 1fr 2fr 1fr;
  padding: .5rem;
  p {
    margin: 0;
    text-transform: capitalize;
  }
`;