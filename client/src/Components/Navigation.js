import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Menu from './Menu';
import { useAppContext } from '../State';
import { H3, Wrapper } from '../Elements';


const Navigation = () => {
  const { isNavOpen, closeNav } = useAppContext();
  return (
    <Wrapper>
      <Header>
        <div><Link to="/"><H3>John Barhorst</H3></Link></div>
        <Menu />
      </Header>
      <div>
        <Nav
          variants={navVariants}
          initial={false}
          animate={isNavOpen ? 'open' : 'closed'}
        >
          <Ul
          >
            <Li
              variants={liVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: .95 }}
            >
              <Link onClick={() => closeNav()} to="/">Home</Link>
            </Li>
            <Li
              variants={liVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: .95 }}
            >
              <Link onClick={() => closeNav()} to="/portfolio">Portfolio</Link>
            </Li>
            <Li
              variants={liVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: .95 }}
            >
              <Link onClick={() => closeNav()} to="/destiny">Destiny Search</Link>
            </Li>
            <Li
              variants={liVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: .95 }}
            >
              <Link onClick={() => closeNav()} to="/preference">Preference Ranking</Link>
            </Li>
            <Li
              variants={liVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: .95 }}
            >
              <Link onClick={() => closeNav()} to="/contact">Get In Touch</Link>
            </Li>
          </Ul>
        </Nav>
      </div>
    </Wrapper>
  )
}

export default Navigation;

const Header = styled(motion.header)`
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin: 1em 0;
`;

const Nav = styled(motion.nav)`
`;

const Ul = styled(motion.ul)`
  list-style: none;
  padding: 0;
  text-align: right;
`;

const Li = styled(motion.li)`
  font-size: 2em;
  padding: 0 5px;
  margin: 0;
`;

const navVariants = {
  open: {
    height: '100vh',
    transition: {
      staggerChildren: .2,
      when: "beforeChildren"
    }
  },
  closed: {
    height: 0,

    transition: {
      staggerChildren: .1,
      when: "afterChildren",
      staggerDirection: -1
    }
  },
  exit: {
    height: 0,
    overflow: 'hidden',
    transition: {
      duration: 0
    }
  }
};

const liVariants = {
  open: {
    height: 'auto',
    opacity: 1,
    x: 0,
    transition: {
      stiffness: 1000,
      velocity: -100
    }
  },
  closed: {
    x: 300,
    height: 0,
    opacity: 0,
    transistion: {
      duration: .1,
      stiffness: 1000
    }
  }
};