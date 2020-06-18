import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Menu from './Menu';
import { useAppContext } from '../State';
import { H3 } from '../Elements';

// TODO There's a bug where if you use tab and enter, the menu animation will be wonky next time the menu is opened.

const Navigation = () => {
  const { isNavOpen, closeNav } = useAppContext();
  return (
    <header>
      <TopBar>
        <div><Link onClick={() => closeNav()} to="/"><H3>John Barhorst</H3></Link></div>
        <Menu />
      </TopBar>
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
              <Link onClick={() => closeNav()} to="/portfolio">Mini Projects</Link>
            </Li>
            <Li
              variants={liVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: .95 }}
            >
              <Link onClick={() => closeNav()} to="/destiny/search">Destiny Search</Link>
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
    </header>
  )
}

export default Navigation;



const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin: 1em 0;
`;

const Nav = styled(motion.nav)`
  overflow: hidden;
  padding: 0 5%;
  @media screen and (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 40%;
    margin-left: auto;
    border-radius: 10px 0px 0px 10px;
  }
`;

const Ul = styled(motion.ul)`
  list-style: none;
  padding: 0;
  display: grid;
  justify-content: end;
  text-align: right;
  gap: 5px;
`;

const Li = styled(motion.li)`
  font-size: 2em;
  margin: 0;
`;

const navVariants = {
  open: {
    height: '100vh',
    transition: {
      staggerChildren: .2,
      height: {
        duration: .2
      }
    }
  },
  closed: {
    height: 0,
    transition: {
      staggerChildren: .1,
      when: "afterChildren",
      staggerDirection: -1
    }
  }
};

const liVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      stiffness: 1000,
      velocity: -100
    }
  },
  closed: {
    x: 300,
    opacity: 0,
    transistion: {
      duration: .1,
      stiffness: 1000
    }
  }
};