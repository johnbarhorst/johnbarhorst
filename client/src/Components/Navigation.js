import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Menu from './Menu';
import { useAppContext } from '../State';
import { H3 } from '../Elements';


const Navigation = () => {
  const { isNavOpen, closeNav } = useAppContext();
  return (
    <Wrapper>
      <Header>
        <div><Link to="/"><H3>John Barhorst</H3></Link></div>
        <Menu />
      </Header>
      <div>
        <AnimatePresence>
          {isNavOpen &&
            <Nav
              variants={navVariants}
              initial={'closed'}
              animate={isNavOpen ? 'open' : 'closed'}
              exit={'exit'}
            >
              <Ul
              >
                <Li variants={liVariants}><Link onClick={() => closeNav()} to="/">Home</Link></Li>
                <Li variants={liVariants}><Link onClick={() => closeNav()} to="/about">About Me</Link></Li>
                <Li variants={liVariants}><Link onClick={() => closeNav()} to="/portfolio">Portfolio</Link></Li>
                <Li variants={liVariants}><Link onClick={() => closeNav()} to="/destiny">Destiny Search Demo</Link></Li>
                <Li variants={liVariants}><Link onClick={() => closeNav()} to="/preference">Preference Ranking Demo</Link></Li>
              </Ul>
            </Nav>}
        </AnimatePresence>
      </div>
    </Wrapper>
  )
}

export default Navigation;
const Wrapper = styled(motion.section)`
  max-width: 90%;
  margin: 0 auto;
`;

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
`;

const Li = styled(motion.li)`
  font-size: 2em;
  padding: 0 5px;
  margin: 0;
`;

const navVariants = {
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
  },
  exit: {
    height: 0,
    overflow: 'hidden',
    transitiion: {
      duration: 0
    }
  }
};

const liVariants = {
  open: {
    height: 'auto',
    opacity: 1,
    y: 0
  },
  closed: {
    y: -30,
    height: 0,
    opacity: 0,
    transistion: {
      duration: .2
    }
  }
};