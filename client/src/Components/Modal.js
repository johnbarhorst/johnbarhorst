import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const containerVariants = {
  initial: {
    opacity: 0
  },
  open: {
    opacity: 1,
    zIndex: 1000
  },
  closed: {
    opacity: 0,
    scale: 0.5,
    zIndex: -1,
    overflow: 'hidden',
    transition: {
      duration: .5,
      staggerChildren: 0.2,
      staggerOrder: -1,
      when: 'afterChildren',
    }
  }
}


const cardVariants = {
  open: {
    y: 0,
    transition: {
      staggerChildren: .1,
      when: "beforeChildren"
    }
  },
  closed: {
    y: 50,
    transition: {
      staggerChildren: .1,
      when: "afterChildren"
    }
  },
  exit: {
    height: 0,
    transition: {
      staggerChildren: .1,
      when: "afterChildren"
    }
  }
}

const textVariants = {
  open: {
    opacity: 1,
    y: 0
  },
  closed: {
    opacity: 0,
    y: 10
  }
}

const Modal = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <ModalContainer
      variants={containerVariants}
      initial='initial'
      animate={isModalOpen ? 'open' : 'closed'}
      exit='closed'
    >
      {isModalOpen &&
        <ModalCard
          variants={cardVariants}
          initial="closed"
          animate={isModalOpen ? 'open' : 'closed'}
          key={0}
        >
          <motion.h1
            variants={textVariants}
            key={1}
          >
            Headlines!
              </motion.h1>
          <motion.h3
            variants={textVariants}
            key={2}
          >
            Sub Headlines!
              </motion.h3>
          <Button
            onClick={() => setIsModalOpen(false)}
            variants={textVariants}
            key={3}
          >Action Has Been Called!
              </Button>
        </ModalCard>
      }
    </ModalContainer>
  )
}

export default Modal;

const ModalContainer = styled(motion.div)`
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0,0);
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, 0.4);
`;

const ModalCard = styled(motion.div)`
  text-align: center;
  position: relative;
  height: 80%;
  width: 60%;
  background: #fff;
  border-radius: 15px;
  box-shadow: 1px 1px 15px rgba(0,0,0,0.4);
  `;

const Button = styled(motion.button)`
  height: 50px;
  padding: 0 10px;
  border: 1px solid #aaa;
  border-radius: 10px;
  font-weight: bold;
  background: linear-gradient(#64B5F6, #42A5F5);
  box-shadow: 1px 1px 5px rgba(0,0,0,0.4);
  
  `;