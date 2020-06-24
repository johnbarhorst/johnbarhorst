import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SocketThumbnail = styled(motion.div)`
height: ${props => props.small ? '68px' : '35px'};
width: ${props => props.small ? '68px' : '35px'};
background-image: url('https://www.bungie.net${props => props.background}');
background-size: cover;
`;