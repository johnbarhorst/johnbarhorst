import React from 'react';
import styled from 'styled-components';

const Sockets = ({ sockets }) => {
  return (
    <SocketsWrapper className={'full-span'}>
      {sockets.map(socket => socket.isVisible ? <Socket {...socket} key={socket.plugHash} /> : null)}
    </SocketsWrapper>
  )
}

export default Sockets;

const Socket = ({ name, icon, hasIcon, plugHash }) => {

  return (
    <React.Fragment key={plugHash}>
      {hasIcon && <Img src={`https://www.bungie.net${icon}`} />}
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