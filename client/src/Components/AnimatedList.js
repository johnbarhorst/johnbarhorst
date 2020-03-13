import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ulVariants = {
  open: {
    height: 'auto',
    transition: {
      staggerChildren: .2,
      when: "beforeChildren"
    }
  },
  closed: {
    height: 0,
    transition: {
      staggerChildren: .2,
      when: "afterChildren",
      staggerDirection: -1
    }
  }
};

const liVariants = {
  open: {
    height: 'auto',
    opacity: 1
  },
  closed: {
    height: 0,
    opacity: 0
  }
};

const AnimatedList = ({ isMenuOpen }) => {
  return (
    <Ul
      variants={ulVariants}
      initial={'closed'}
      animate={isMenuOpen ? 'open' : 'closed'}
    >
      <Li variants={liVariants}>Home</Li>
      <Li variants={liVariants}>Shop</Li>
      <Li variants={liVariants}>About</Li>
      <Li variants={liVariants}>Contact</Li>
    </Ul>
  )
}

export default AnimatedList;

const Ul = styled(motion.ul)`
  list-style: none;
  padding: 5px 5px;
  margin: 0;

`;

const Li = styled(motion.li)`
  font-size: 2em;
  padding: 0 5px;
  margin: 0;
`;