import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { H1, H2, H3, Wrapper } from '../Elements';

const Main = () => {
  const intro = 'Hi, thanks for stopping by.'
  const secondLine = `I'm John, I build rad stuff for the web.`;

  const wrapString = string => string.split('').map(l => `
    <L
      variants={typedVariant}
      >${l}</L>
  `).join('');

  console.log(wrapString(intro));
  console.log(wrapString(secondLine));
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
      <TopSection>
        <TypeWriter
          variants={typewriterVariants}
          initial={'initial'}
          animate={'animate'}>
          <L
            variants={typedVariant}
          >H</L>

          <L
            variants={typedVariant}
          >i</L>

          <L
            variants={typedVariant}
          >,</L>

          <L
            variants={typedVariant}
          > </L>

          <L
            variants={typedVariant}
          >t</L>

          <L
            variants={typedVariant}
          >h</L>

          <L
            variants={typedVariant}
          >a</L>

          <L
            variants={typedVariant}
          >n</L>

          <L
            variants={typedVariant}
          >k</L>

          <L
            variants={typedVariant}
          >s</L>

          <L
            variants={typedVariant}
          > </L>

          <L
            variants={typedVariant}
          >f</L>

          <L
            variants={typedVariant}
          >o</L>

          <L
            variants={typedVariant}
          >r</L>

          <L
            variants={typedVariant}
          > </L>

          <L
            variants={typedVariant}
          >s</L>

          <L
            variants={typedVariant}
          >t</L>

          <L
            variants={typedVariant}
          >o</L>

          <L
            variants={typedVariant}
          >p</L>

          <L
            variants={typedVariant}
          >p</L>

          <L
            variants={typedVariant}
          >i</L>

          <L
            variants={typedVariant}
          >n</L>

          <L
            variants={typedVariant}
          >g</L>

          <L
            variants={typedVariant}
          > </L>

          <L
            variants={typedVariant}
          >b</L>

          <L
            variants={typedVariant}
          >y</L>

          <L
            variants={typedVariant}
          >.</L>
        </TypeWriter>
        <TypeWriter
          variants={typewriterVariants}
          initial={'initial'}
          animate={'animate'}>
          <L
            variants={typedVariant}
          >I</L>

          <L
            variants={typedVariant}
          >'</L>

          <L
            variants={typedVariant}
          >m</L>

          <L
            variants={typedVariant}
          > </L>

          <L
            variants={typedVariant}
          >J</L>

          <L
            variants={typedVariant}
          >o</L>

          <L
            variants={typedVariant}
          >h</L>

          <L
            variants={typedVariant}
          >n</L>

          <L
            variants={typedVariant}
          >,</L>

          <L
            variants={typedVariant}
          > </L>

          <L
            variants={typedVariant}
          >I</L>

          <L
            variants={typedVariant}
          > </L>

          <L
            variants={typedVariant}
          >b</L>

          <L
            variants={typedVariant}
          >u</L>

          <L
            variants={typedVariant}
          >i</L>

          <L
            variants={typedVariant}
          >l</L>

          <L
            variants={typedVariant}
          >d</L>

          <L
            variants={typedVariant}
          > </L>

          <L
            variants={typedVariant}
          >r</L>

          <L
            variants={typedVariant}
          >a</L>

          <L
            variants={typedVariant}
          >d</L>

          <L
            variants={typedVariant}
          > </L>

          <L
            variants={typedVariant}
          >s</L>

          <L
            variants={typedVariant}
          >t</L>

          <L
            variants={typedVariant}
          >u</L>

          <L
            variants={typedVariant}
          >f</L>

          <L
            variants={typedVariant}
          >f</L>

          <L
            variants={typedVariant}
          > </L>

          <L
            variants={typedVariant}
          >f</L>

          <L
            variants={typedVariant}
          >o</L>

          <L
            variants={typedVariant}
          >r</L>

          <L
            variants={typedVariant}
          > </L>

          <L
            variants={typedVariant}
          >t</L>

          <L
            variants={typedVariant}
          >h</L>

          <L
            variants={typedVariant}
          >e</L>

          <L
            variants={typedVariant}
          > </L>

          <L
            variants={typedVariant}
          >w</L>

          <L
            variants={typedVariant}
          >e</L>

          <L
            variants={typedVariant}
          >b</L>

          <L
            variants={typedVariant}
          >.</L>
        </TypeWriter>
      </TopSection>

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
    </Wrapper>
  )
}

export default Main;

const TopSection = styled(motion.section)`
  text-align: center; 
  margin: 5em 0;
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

const L = styled(motion.span)`

`;

const TypeWriter = styled(motion.p)`
`;

const typewriterVariants = {
  initial: {
    transition: {
      staggerChildren: .2
    }
  },
  animate: {
    transition: {
      staggerChildren: .2
    }
  }
}

const typedVariant = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1
    }
  }
}