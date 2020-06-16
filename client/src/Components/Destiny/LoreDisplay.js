import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useToggle } from '../../Hooks';


const LoreDisplay = ({ lore }) => {
  // Chop up the wall of text into paragraph blocks.
  const loreArray = lore.split(/\n/g);
  const { isToggled, toggle } = useToggle(false);

  return (
    <Wrapper>
      <Button onClick={() => toggle()} >Lore {isToggled ? <span>&#9650;</span> : <span>&#9660;</span>}</Button>
      <LoreContainer
        variants={variants}
        initial={false}
        animate={isToggled ? 'open' : 'closed'}
      >
        {loreArray.map((text, i) => text.length > 0 && <motion.p key={i} variants={childVariants}>{text}</motion.p>)}
      </LoreContainer>
    </Wrapper>
  )
}

export default LoreDisplay;

const Wrapper = styled(motion.div)`
  text-align: center;
  overflow: hidden;
`;

const Button = styled(motion.button)`    
  background: ${props => props.theme.background};
  color: ${props => props.theme.color};
  padding: .5rem 2.5rem;
  margin-bottom: 2rem;
  border: none;
  border-radius: 28px;
  font-weight: ${props => props.theme.fonts.fw_bold};
  outline: none; 
`;

const LoreContainer = styled(motion.article)`
  text-align: left;
  padding: 1rem;
  background: ${props => props.theme.background};
  p {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;

const variants = {
  open: {
    height: 'auto',
    padding: null,
    transition: {
      staggerChildren: .3,
      height: {
        duration: .2
      }
    }
  },
  closed: {
    height: 0,
    padding: 0,
    transition: {
      padding: 0
    }
  }
}

const childVariants = {
  open: {
    opacity: 1,
    transition: {
      duration: 1
    }
  },
  closed: {
    opacity: 0
  }

}