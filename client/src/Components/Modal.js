import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  initial: {
    opacity: 0
  },
  open: {
    opacity: 1
  },
  closed: {
    opacity: 0,
    y: -300,
    overflow: 'hidden',
    transition: {
      staggerChildren: .2,
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
    <AnimatePresence exitBeforeEnter>
      {isModalOpen &&
        <motion.div
          variants={containerVariants}
          initial='initial'
          animate='open'
          exit='closed'
        >
          <ModalContainer>
            <ModalCard
              variants={cardVariants}
              initial="closed"
              animate="open"
              exit="closed"
              key={'card'}
            >
              <motion.h1
                variants={textVariants}
              >
                Headlines!
              </motion.h1>
              <motion.h3
                variants={textVariants}
              >
                Sub Headlines!
              </motion.h3>
              <Button onClick={() => setIsModalOpen(false)} variants={textVariants}>Action Has Been Called!</Button>
            </ModalCard>
          </ModalContainer>
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default Modal;

const ModalContainer = styled.div`
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
  background: linear-gradient(#C9D6FF, #E2E2E2);
  box-shadow: 1px 1px 5px rgba(0,0,0,0.4);

  `;