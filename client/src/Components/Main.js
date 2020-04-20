import React from 'react';
import styled from 'styled-components';
import Menu from './Menu';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../State';
import { H1, H2 } from '../Elements';

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
          <H1>I'm John</H1>
          <p>I build rad stuff for the web.</p>
          <ProfilePic src="./img/meandv.jpg" alt="A bearded, bespectacled man with his dog" />
        </section>

        <section>
          <H2>What I Use</H2>
          <ColThree>
            <article>
              <h3>React.js</h3>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse ab quae molestias laboriosam beatae vero ipsa quam vitae quaerat aspernatur porro reprehenderit excepturi est libero natus cupiditate, itaque quidem! Repellat.</p>
            </article>
            <article>
              <h3>Node/Express</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam officiis ab eveniet harum nostrum placeat perspiciatis exercitationem tempore dolores ducimus quod, consectetur est a voluptates omnis. Quasi ex possimus molestiae!</p>
            </article>
            <article>
              <h3>Framer Motion</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum nam voluptate cum architecto deserunt asperiores dicta beatae accusantium veritatis repellat! Reprehenderit non, sed odio iste deleniti ipsa blanditiis enim recusandae!</p>
            </article>
          </ColThree>
          <a href="#">Examples</a>
        </section>
        <section>
          <H2>A little about me...</H2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, dignissimos perferendis enim velit modi non quae possimus cupiditate assumenda placeat vero sapiente voluptas id similique, veritatis impedit culpa tempore deserunt!</p>
          <div>
            <p></p>
            <p></p>
          </div>
        </section>
        <footer>
          <a href="mailto:johnbarhorst.dev@gmail.com">John Barhorst</a>
        </footer>
      </Wrapper>
    </AnimatePresence>
  )
}

export default Main;

const Wrapper = styled(motion.section)`
  /* text-align: center; */
  /* height: 100vh; */
`;

const ProfilePic = styled(motion.img)`
  width: 300px;
`;

const ColThree = styled(motion.div)`
  display: grid;
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
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