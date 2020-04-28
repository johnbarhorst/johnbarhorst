import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { H2, Wrapper } from '../Elements';
import AnimateTypewriter, { typewriterVariants } from './AnimateTypewriter';

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
            secondary
          ><AnimateTypewriter string={'Thanks for stopping by.'} /></H2>
          <motion.p
            style={{
              fontFamily: `Special Elite`
            }}
          ><AnimateTypewriter string={`I'm John, I build rad stuff for the web.`} /></motion.p>
        </div>
      </TopSection>
      <MainSection>
        <ProfilePic />
        <ColThree>
          <article>
            <p>I write clean, maintainable and reusable code with React and Node.</p>
          </article>
          <article>
            <p>Nearly two decades in the delivery industry taught me a lot about hard work, hustle, and making sure things get done. Now I bring that work ethic into my web projects.</p>
          </article>
          <article>
            <p>I do stuff! I swear. Sometimes I run. Sometimes I walk. Sometimes I bike.</p>
          </article>
        </ColThree>
      </MainSection>
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
  height: calc(100vh - 38px);
`;

const MainSection = styled(motion.section)`
  background: ${props => props.theme.colors.serenity};
  padding-top: 2em;
  h2, h3 {
    text-align: center;
  }
  p {
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
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
