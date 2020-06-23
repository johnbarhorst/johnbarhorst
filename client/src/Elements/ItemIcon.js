import styled from 'styled-components';
import { motion } from 'framer-motion';


export const ItemIcon = styled(motion.img)`
height: 80px;
width: 80px;
border: 2px solid ${props => props.isMasterworked ? 'gold' : 'white'};
margin: ${props => props.centered && '0 auto'};
`;