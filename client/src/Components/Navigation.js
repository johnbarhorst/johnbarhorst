import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';


const Navigation = () => {
  return (
    <nav>
      <Ul>
        <li><Link to="/">John Barhorst</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
      </Ul>
    </nav>
  )
}

export default Navigation;


const Ul = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  list-style: none;
  padding: 0 10px;
  li {
    margin: 0 5px;
    &:first-child {
    margin-right: auto;
      }
  a {
    text-decoration: none;
    color: #333;
  }
  }
`;