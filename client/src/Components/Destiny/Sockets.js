import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SocketThumbnail } from '../../Elements'


const Sockets = ({ sockets, isExpanded }) => {
  return (
    <SocketsWrapper className={isExpanded && 'isExpanded'}>
      {/* Adding index to socket plughash to cut down on duplicate keys. Occasionally sockets appear twice */}
      {sockets.map((socket, i) => socket.isVisible ? <Socket {...socket} isExpanded={isExpanded} key={socket.plugHash + i} /> : null)}
    </SocketsWrapper>
  )
}

export default Sockets;

const Socket = ({ name, icon, isExpanded, plugHash }) => {
  return (
    <>
      <SocketThumbnail
        background={icon}
        key={plugHash}
        className={isExpanded && 'isExpanded'}
        small={isExpanded}
        positionTransition
      />
      {isExpanded &&
        <p>{name}</p>}
    </>
  )
}

const SocketsWrapper = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  
  &.isExpanded {
    grid-template-columns: repeat(4, 1fr);
    padding-bottom: 1rem;
  }
`;