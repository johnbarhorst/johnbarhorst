import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SocketThumbnail } from '../../Elements'


const Sockets = ({ sockets, isExpanded }) => {
  return (
    <SocketsWrapper className={isExpanded && 'isExpanded full-span'}>
      {/* Adding index to socket plughash to cut down on duplicate keys. Occasionally sockets appear twice */}
      {sockets.map((socket, i) => socket.isVisible ? <Socket {...socket} isExpanded={isExpanded} key={socket.plugHash + i} /> : null)}
    </SocketsWrapper>
  )
}

export default Sockets;

const Socket = ({ name, icon, isExpanded, plugHash, description }) => {
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
        <div>
          <p>{name}</p>
          <p>{description}</p>
        </div>
      }
    </>
  )
}

const SocketsWrapper = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  
  &.isExpanded {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 1rem;
    font-size: 12px;
    align-items: center;
    padding-bottom: 1rem;
  }
`;