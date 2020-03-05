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
      when: "afterChildren"
    }
  }
};

const liVariants = {
  open: {
    height: 'auto',
    opacity: 1
  },
  closed: {
    height: 30,
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

`;

const Li = styled(motion.li)`

`;