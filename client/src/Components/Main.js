import React from 'react';
import styled from 'styled-components';
import Menu from './Menu';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../State';

const Main = () => {
  const { isNavOpen } = useAppContext();
  return (
    <AnimatePresence>
      <Wrapper
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        transition={{
          damping: 300
        }}
      >
        <header>
          <div><h3>Logo Here</h3></div>
          <Menu />
          <AnimatePresence>
            {isNavOpen &&
              <Nav
                variants={navVariants}
                initial={'closed'}
                animate={isNavOpen ? 'open' : 'closed'}
                exit={'closed'}
              >
                <Ul
                >
                  <Li variants={liVariants}>Home</Li>
                  <Li variants={liVariants}>My Services</Li>
                  <Li variants={liVariants}>About Me</Li>
                  <Li variants={liVariants}>Contact</Li>
                </Ul>
              </Nav>}
          </AnimatePresence>
        </header>
        <section>
          <h1>I'm John</h1>
          <p>I help your business grow on the web.</p>

        </section>

        <section>
          <h2>What I Use</h2>
          <ColThree>
            <div>
              <h3>React.js</h3>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse ab quae molestias laboriosam beatae vero ipsa quam vitae quaerat aspernatur porro reprehenderit excepturi est libero natus cupiditate, itaque quidem! Repellat.</p>
            </div>
            <div>
              <h3>Node/Express</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam officiis ab eveniet harum nostrum placeat perspiciatis exercitationem tempore dolores ducimus quod, consectetur est a voluptates omnis. Quasi ex possimus molestiae!</p>
            </div>
            <div>
              <h3>Framer Motion</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum nam voluptate cum architecto deserunt asperiores dicta beatae accusantium veritatis repellat! Reprehenderit non, sed odio iste deleniti ipsa blanditiis enim recusandae!</p>
            </div>
          </ColThree>
          <a href="">Examples</a>
        </section>
      </Wrapper>
    </AnimatePresence>
  )
}

export default Main;

const Wrapper = styled(motion.section)`
  text-align: center;
  height: 100vh;
  display: grid;
`;

const ColThree = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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