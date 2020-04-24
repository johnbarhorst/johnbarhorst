import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { H1, H2, H3, Wrapper } from '../Elements';
import AnimateTypewriter from './AnimateTypewriter';

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
      <TopSection
        variants={typewriterVariants}
        initial={'initial'}
        animate={'animate'}
      >
        <div>
          <H2
            typewriter
          ><AnimateTypewriter string={'Thanks for stopping by.'} /></H2>
          <motion.p
            // variants={typewriterVariants}
            // initial={'initial'}
            // animate={'animate'}
            style={{
              fontFamily: `Special Elite`
            }}
          ><AnimateTypewriter string={`I'm John, I build rad stuff for the web.`} /></motion.p>
        </div>
      </TopSection>
      <section>
      </section>
      <section>
        <ProfilePic />
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
    </Wrapper >
  )
}

export default Main;

const TopSection = styled(motion.section)`
  text-align: center; 
  display: grid;
  align-content: center;
  height: calc(100vh - 22px);
`;

const ProfilePic = styled(motion.div)`
  background: url("./img/meandv.jpg") #fff left / cover;
  border-radius: 50%;
  max-width: calc(50vw - 10%);
  padding-top: calc(50vw - 10%);
  margin: 0 auto;
`;

const ColThree = styled(motion.div)`
  display: grid;
  @media screen and (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const typewriterVariants = {
  initial: {
    transition: {
      staggerChildren: .1
    }
  },
  animate: {
    transition: {
      staggerChildren: .1
    }
  }
}