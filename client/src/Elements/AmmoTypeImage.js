import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AmmoTypeImage = styled(motion.div)`
background-image: url('https://www.bungie.net${props => props.background}');
background-size: contain;
background-position: center;
background-repeat: no-repeat;
height: 30px;
width: 30px;
margin-left: auto;
`;