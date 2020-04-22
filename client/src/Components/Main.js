import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
        <H1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { duration: .3, delay: .1 } }} >I'm John</H1>
        <p>I build rad stuff for the web.</p>
        <ProfilePicContainer>
          <ProfilePic src="./img/mapme.jpg" alt="A beautiful, bald, bearded, and bespectacled individual" />
        </ProfilePicContainer>
      </section>

      <section>
        <H2>What I Build</H2>
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
const ProfilePicContainer = styled(motion.div)`
border-radius: 50%;
width: calc(50vw - 10%);
height: calc(50vw - 10%);
margin: 0 auto;

`;

const ColThree = styled(motion.div)`
  display: grid;
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

