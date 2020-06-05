import React from 'react';
import styled from 'styled-components';

const Sockets = ({ sockets }) => {
  return (
    <div className={'full-span'} >
      {sockets.map(socket => socket.isVisible ? <Socket {...socket} /> : null)}
    </div>
  )
}

export default Sockets;

const Socket = ({ name, isVisible, icon, hasIcon, plugHash }) => {
  return (
    <React.Fragment key={plugHash}>
      {hasIcon && <Img src={`https://www.bungie.net${icon}`} />}
    </React.Fragment>
  )
}

const Img = styled.img`
  background-color: #333;
`