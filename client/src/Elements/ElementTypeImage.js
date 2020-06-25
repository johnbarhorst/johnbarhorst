import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ElementTypeImage = styled(motion.div)`
background-image: url('https://www.bungie.net${props => props.background}');
background-size: cover;
height: 30px;
width: 30px;
`;