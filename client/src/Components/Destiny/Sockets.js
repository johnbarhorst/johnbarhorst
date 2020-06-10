import React from 'react';
import styled from 'styled-components';

const Sockets = ({ sockets }) => {
  return (
    <SocketsWrapper className={'full-span'}>
      {/* Adding index to socket plughash to cut down on duplicate keys. Occasionally sockets appear twice */}
      {sockets.map((socket, i) => socket.isVisible ? <Socket {...socket} key={socket.plugHash + i} /> : null)}
    </SocketsWrapper>
  )
}

export default Sockets;

const Socket = ({ name, icon, hasIcon }) => {

  return (
    <React.Fragment>
      {hasIcon && <Img src={`https://www.bungie.net${icon}`} />}
      <p>{name}</p>
    </React.Fragment>
  )
}

const SocketsWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

const Img = styled.img`
  background-color: #333;
  max-height: 68px;
  max-width: 68px;
`