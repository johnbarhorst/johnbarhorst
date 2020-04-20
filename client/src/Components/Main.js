import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { H1, H2, Wrapper } from '../Elements';

const Main = () => {
  return (
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
    >
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
        <Link to='/portfolio'>Examples</Link>
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
  )
}

export default Main;

const ProfilePic = styled(motion.img)`
`;

const ColThree = styled(motion.div)`
  display: grid;
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

