import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SocketThumbnail } from '../../Elements'


const Sockets = ({ sockets, isToggled }) => {
  return (
    <SocketsWrapper collapsed={!isToggled}>
      {/* Adding index to socket plughash to cut down on duplicate keys. Occasionally sockets appear twice */}
      {sockets.map((socket, i) => socket.isVisible ? <Socket {...socket} isToggled={isToggled} key={socket.plugHash + i} /> : null)}
    </SocketsWrapper>
  )
}

export default Sockets;

const Socket = ({ name, icon, isToggled, plugHash }) => {
  return (
    <>
      <SocketThumbnail background={icon} key={plugHash} collapsed={isToggled} small={isToggled} positionTransition />
      {isToggled &&
        <p>{name}</p>}
    </>
  )
}

const SocketsWrapper = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(${props => props.collapsed ? '2' : '4'}, 1fr);
  ${props => !props.collapsed && `padding-bottom: 1rem;`}
`;